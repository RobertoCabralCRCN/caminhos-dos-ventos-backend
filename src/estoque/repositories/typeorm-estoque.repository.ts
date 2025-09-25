import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { EstoqueItem, StatusEstoque } from "../../entities/estoque-item.entity";
import { EstoqueMovimentacao } from "../../entities/estoque-movimentacao.entity";
import { EstoqueAlerta } from "../../entities/estoque-alerta.entity";
import { UpdateEstoqueDto } from "../dto/update-estoque.dto";
import { CreateMovimentacaoDto } from "../dto/create-movimentacao.dto";
import { IEstoqueRepository } from "./estoque.repository.interface";

@Injectable()
export class TypeOrmEstoqueRepository implements IEstoqueRepository {
  constructor(
    @InjectRepository(EstoqueItem)
    private estoqueItemRepository: Repository<EstoqueItem>,
    @InjectRepository(EstoqueMovimentacao)
    private movimentacaoRepository: Repository<EstoqueMovimentacao>,
    @InjectRepository(EstoqueAlerta)
    private alertaRepository: Repository<EstoqueAlerta>,
  ) {}

  async findAllItems(): Promise<EstoqueItem[]> {
    console.log("📦 REPOSITORY: Buscando todos os itens de estoque");
    return this.estoqueItemRepository.find({
      relations: ["produto"],
      order: { dataAtualizacao: "DESC" }
    });
  }

  async findItemByProductId(productId: string): Promise<EstoqueItem | null> {
    console.log("🔍 REPOSITORY: Buscando item de estoque por produto:", productId);
    return this.estoqueItemRepository.findOne({
      where: { produto: { id: productId } },
      relations: ["produto"]
    });
  }

  async createItem(productId: string): Promise<EstoqueItem> {
    console.log("➕ REPOSITORY: Criando item de estoque para produto:", productId);
    
    const item = this.estoqueItemRepository.create({
      produto: { id: productId } as any,
      currentStock: 0,
      minimumStock: 5,
      maximumStock: 100,
      unitCost: 0,
      totalValue: 0,
      status: StatusEstoque.OUT_OF_STOCK
    });

    const savedItem = await this.estoqueItemRepository.save(item);
    console.log("✅ REPOSITORY: Item de estoque criado:", savedItem.id);
    return savedItem;
  }

  async updateItem(productId: string, updateDto: UpdateEstoqueDto): Promise<EstoqueItem> {
    console.log("✏️ REPOSITORY: Atualizando item de estoque:", productId);
    
    const item = await this.findItemByProductId(productId);
    if (!item) {
      throw new Error("Item de estoque não encontrado");
    }

    // Atualizar campos
    if (updateDto.currentStock !== undefined) {
      item.currentStock = updateDto.currentStock;
    }
    if (updateDto.minimumStock !== undefined) {
      item.minimumStock = updateDto.minimumStock;
    }
    if (updateDto.maximumStock !== undefined) {
      item.maximumStock = updateDto.maximumStock;
    }
    if (updateDto.unitCost !== undefined) {
      item.unitCost = updateDto.unitCost;
    }

    // Recalcular valor total e status
    item.totalValue = item.currentStock * item.unitCost;
    item.status = this.calculateStockStatus(item.currentStock, item.minimumStock, item.maximumStock);

    const savedItem = await this.estoqueItemRepository.save(item);
    console.log("✅ REPOSITORY: Item de estoque atualizado:", productId);
    return savedItem;
  }

  async deleteItem(productId: string): Promise<void> {
    console.log("🗑️ REPOSITORY: Removendo item de estoque:", productId);
    await this.estoqueItemRepository.delete({ produto: { id: productId } as any });
    console.log("✅ REPOSITORY: Item de estoque removido:", productId);
  }

  async findAllMovements(): Promise<EstoqueMovimentacao[]> {
    console.log("📋 REPOSITORY: Buscando todas as movimentações");
    return this.movimentacaoRepository.find({
      relations: ["produto", "usuario", "cliente"],
      order: { dataCriacao: "DESC" }
    });
  }

  async findMovementsByProduct(productId: string): Promise<EstoqueMovimentacao[]> {
    console.log("🔍 REPOSITORY: Buscando movimentações por produto:", productId);
    return this.movimentacaoRepository.find({
      where: { produto: { id: productId } as any },
      relations: ["produto", "usuario", "cliente"],
      order: { dataCriacao: "DESC" }
    });
  }

  async createMovement(createDto: CreateMovimentacaoDto, userId: string): Promise<EstoqueMovimentacao> {
    console.log("📝 REPOSITORY: Criando movimentação:", JSON.stringify(createDto, null, 2));
    
    // Buscar ou criar item de estoque
    let item = await this.findItemByProductId(createDto.produtoId);
    if (!item) {
      item = await this.createItem(createDto.produtoId);
    }

    const stockBefore = item.currentStock;
    let stockAfter = stockBefore;

    // Calcular novo estoque baseado no tipo de movimentação
    switch (createDto.type) {
      case "in":
        stockAfter = stockBefore + createDto.quantity;
        break;
      case "out":
        stockAfter = Math.max(0, stockBefore - createDto.quantity);
        break;
      case "adjustment":
        stockAfter = createDto.quantity;
        break;
    }

    // Criar movimentação
    const movimentacao = this.movimentacaoRepository.create({
      produto: { id: createDto.produtoId } as any,
      type: createDto.type,
      quantity: createDto.quantity,
      reason: createDto.reason,
      reference: createDto.reference,
      notes: createDto.notes,
      unitCost: createDto.unitCost,
      totalCost: createDto.unitCost ? createDto.quantity * createDto.unitCost : 0,
      stockBefore,
      stockAfter,
      usuario: { id: userId } as any,
      cliente: createDto.clienteId ? { id: createDto.clienteId } as any : undefined
    });

    const savedMovimentacao = await this.movimentacaoRepository.save(movimentacao);

    // Atualizar estoque
    await this.updateItem(createDto.produtoId, { currentStock: stockAfter });

    // Verificar alertas
    await this.checkAndCreateAlerts(createDto.produtoId, stockAfter, item.minimumStock, item.maximumStock);

    console.log("✅ REPOSITORY: Movimentação criada:", savedMovimentacao.id);
    return savedMovimentacao;
  }

  async findAllAlerts(): Promise<EstoqueAlerta[]> {
    console.log("🚨 REPOSITORY: Buscando todos os alertas");
    return this.alertaRepository.find({
      relations: ["produto"],
      order: { dataCriacao: "DESC" }
    });
  }

  async findUnacknowledgedAlerts(): Promise<EstoqueAlerta[]> {
    console.log("🚨 REPOSITORY: Buscando alertas não reconhecidos");
    return this.alertaRepository.find({
      where: { acknowledged: false },
      relations: ["produto"],
      order: { dataCriacao: "DESC" }
    });
  }

  async createAlert(alert: Partial<EstoqueAlerta>): Promise<EstoqueAlerta> {
    console.log("🚨 REPOSITORY: Criando alerta:", JSON.stringify(alert, null, 2));
    
    const newAlert = this.alertaRepository.create(alert);
    const savedAlert = await this.alertaRepository.save(newAlert);
    console.log("✅ REPOSITORY: Alerta criado:", savedAlert.id);
    return savedAlert;
  }

  async acknowledgeAlert(alertId: string, userId: string): Promise<EstoqueAlerta> {
    console.log("✅ REPOSITORY: Reconhecendo alerta:", alertId);
    
    const alert = await this.alertaRepository.findOne({ where: { id: alertId } });
    if (!alert) {
      throw new Error("Alerta não encontrado");
    }

    alert.acknowledged = true;
    alert.acknowledgedBy = userId;
    alert.acknowledgedAt = new Date();

    const savedAlert = await this.alertaRepository.save(alert);
    console.log("✅ REPOSITORY: Alerta reconhecido:", alertId);
    return savedAlert;
  }

  async getStockOverview(): Promise<any> {
    console.log("📊 REPOSITORY: Gerando visão geral do estoque");
    
    const items = await this.findAllItems();
    const totalProducts = items.length;
    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
    const lowStock = items.filter(item => item.status === StatusEstoque.LOW_STOCK).length;
    const outOfStock = items.filter(item => item.status === StatusEstoque.OUT_OF_STOCK).length;
    const overstock = items.filter(item => item.status === StatusEstoque.OVERSTOCK).length;

    return {
      totalProducts,
      totalValue,
      lowStock,
      outOfStock,
      overstock,
      inStock: totalProducts - lowStock - outOfStock - overstock
    };
  }

  async getLowStockItems(): Promise<EstoqueItem[]> {
    console.log("⚠️ REPOSITORY: Buscando itens com estoque baixo");
    return this.estoqueItemRepository.find({
      where: { status: StatusEstoque.LOW_STOCK },
      relations: ["produto"],
      order: { currentStock: "ASC" }
    });
  }

  async getOutOfStockItems(): Promise<EstoqueItem[]> {
    console.log("❌ REPOSITORY: Buscando itens sem estoque");
    return this.estoqueItemRepository.find({
      where: { status: StatusEstoque.OUT_OF_STOCK },
      relations: ["produto"],
      order: { dataAtualizacao: "DESC" }
    });
  }

  async getOverstockItems(): Promise<EstoqueItem[]> {
    console.log("📈 REPOSITORY: Buscando itens com excesso de estoque");
    return this.estoqueItemRepository.find({
      where: { status: StatusEstoque.OVERSTOCK },
      relations: ["produto"],
      order: { currentStock: "DESC" }
    });
  }

  async getTotalValue(): Promise<number> {
    console.log("💰 REPOSITORY: Calculando valor total do estoque");
    const items = await this.findAllItems();
    return items.reduce((sum, item) => sum + item.totalValue, 0);
  }

  async getMovementsByPeriod(startDate: Date, endDate: Date): Promise<EstoqueMovimentacao[]> {
    console.log("📅 REPOSITORY: Buscando movimentações por período");
    return this.movimentacaoRepository.find({
      where: {
        dataCriacao: Between(startDate, endDate)
      },
      relations: ["produto", "usuario", "cliente"],
      order: { dataCriacao: "DESC" }
    });
  }

  private calculateStockStatus(currentStock: number, minimumStock: number, maximumStock: number): StatusEstoque {
    if (currentStock === 0) {
      return StatusEstoque.OUT_OF_STOCK;
    } else if (currentStock < minimumStock) {
      return StatusEstoque.LOW_STOCK;
    } else if (currentStock > maximumStock) {
      return StatusEstoque.OVERSTOCK;
    } else {
      return StatusEstoque.IN_STOCK;
    }
  }

  private async checkAndCreateAlerts(productId: string, currentStock: number, minimumStock: number, maximumStock: number): Promise<void> {
    const produto = await this.estoqueItemRepository.findOne({
      where: { produto: { id: productId } as any },
      relations: ["produto"]
    });

    if (!produto) return;

    // Verificar se já existe alerta não reconhecido para este produto
    const existingAlert = await this.alertaRepository.findOne({
      where: {
        produto: { id: productId } as any,
        acknowledged: false
      }
    });

    if (existingAlert) return; // Já existe alerta não reconhecido

    let alert: Partial<EstoqueAlerta> | null = null;

    if (currentStock === 0) {
      alert = {
        produto: { id: productId } as any,
        tipo: "out_of_stock" as any,
        severidade: "critical" as any,
        titulo: "Produto sem estoque",
        mensagem: `${produto.produto.nome} está sem estoque`,
        dados: { currentStock, minimumStock }
      };
    } else if (currentStock < minimumStock) {
      alert = {
        produto: { id: productId } as any,
        tipo: "low_stock" as any,
        severidade: "high" as any,
        titulo: "Estoque baixo",
        mensagem: `${produto.produto.nome} está com estoque baixo (${currentStock}/${minimumStock})`,
        dados: { currentStock, minimumStock }
      };
    } else if (currentStock > maximumStock) {
      alert = {
        produto: { id: productId } as any,
        tipo: "overstock" as any,
        severidade: "medium" as any,
        titulo: "Excesso de estoque",
        mensagem: `${produto.produto.nome} está com excesso de estoque (${currentStock}/${maximumStock})`,
        dados: { currentStock, maximumStock }
      };
    }

    if (alert) {
      await this.createAlert(alert);
    }
  }
}


