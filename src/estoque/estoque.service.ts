import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { EstoqueItem } from "../entities/estoque-item.entity";
import { EstoqueMovimentacao } from "../entities/estoque-movimentacao.entity";
import { EstoqueAlerta } from "../entities/estoque-alerta.entity";
import { CreateMovimentacaoDto } from "./dto/create-movimentacao.dto";
import { UpdateEstoqueDto } from "./dto/update-estoque.dto";
import { AjusteEstoqueDto } from "./dto/ajuste-estoque.dto";
import { IEstoqueRepository } from "./repositories/estoque.repository.interface";
import { ESTOQUE_REPOSITORY } from "./repositories/estoque.repository.constant";

@Injectable()
export class EstoqueService {
  constructor(
    @Inject(ESTOQUE_REPOSITORY)
    private estoqueRepository: IEstoqueRepository
  ) {}

  // Gestão de Itens de Estoque
  async findAllItems(): Promise<EstoqueItem[]> {
    console.log("📦 SERVICE: Listando todos os itens de estoque");
    return this.estoqueRepository.findAllItems();
  }

  async findItemByProductId(productId: string): Promise<EstoqueItem> {
    console.log("🔍 SERVICE: Buscando item de estoque por produto:", productId);
    const item = await this.estoqueRepository.findItemByProductId(productId);
    if (!item) {
      throw new NotFoundException(`Item de estoque não encontrado para o produto ${productId}`);
    }
    return item;
  }

  async updateItem(productId: string, updateDto: UpdateEstoqueDto): Promise<EstoqueItem> {
    console.log("✏️ SERVICE: Atualizando item de estoque:", productId);
    return this.estoqueRepository.updateItem(productId, updateDto);
  }

  async deleteItem(productId: string): Promise<void> {
    console.log("🗑️ SERVICE: Removendo item de estoque:", productId);
    return this.estoqueRepository.deleteItem(productId);
  }

  // Movimentações
  async findAllMovements(): Promise<EstoqueMovimentacao[]> {
    console.log("📋 SERVICE: Listando todas as movimentações");
    return this.estoqueRepository.findAllMovements();
  }

  async findMovementsByProduct(productId: string): Promise<EstoqueMovimentacao[]> {
    console.log("🔍 SERVICE: Buscando movimentações por produto:", productId);
    return this.estoqueRepository.findMovementsByProduct(productId);
  }

  async createMovement(createDto: CreateMovimentacaoDto, userId: string): Promise<EstoqueMovimentacao> {
    console.log("📝 SERVICE: Criando movimentação");
    return this.estoqueRepository.createMovement(createDto, userId);
  }

  async ajustarEstoque(ajusteDto: AjusteEstoqueDto, userId: string): Promise<EstoqueMovimentacao> {
    console.log("⚖️ SERVICE: Realizando ajuste de estoque");
    
    const createDto: CreateMovimentacaoDto = {
      produtoId: ajusteDto.produtoId,
      type: "adjustment" as any,
      quantity: ajusteDto.newStock,
      reason: ajusteDto.reason,
      notes: ajusteDto.notes
    };

    return this.estoqueRepository.createMovement(createDto, userId);
  }

  // Alertas
  async findAllAlerts(): Promise<EstoqueAlerta[]> {
    console.log("🚨 SERVICE: Listando todos os alertas");
    return this.estoqueRepository.findAllAlerts();
  }

  async findUnacknowledgedAlerts(): Promise<EstoqueAlerta[]> {
    console.log("🚨 SERVICE: Listando alertas não reconhecidos");
    return this.estoqueRepository.findUnacknowledgedAlerts();
  }

  async acknowledgeAlert(alertId: string, userId: string): Promise<EstoqueAlerta> {
    console.log("✅ SERVICE: Reconhecendo alerta:", alertId);
    return this.estoqueRepository.acknowledgeAlert(alertId, userId);
  }

  // Relatórios
  async getStockOverview(): Promise<any> {
    console.log("📊 SERVICE: Gerando visão geral do estoque");
    return this.estoqueRepository.getStockOverview();
  }

  async getLowStockItems(): Promise<EstoqueItem[]> {
    console.log("⚠️ SERVICE: Buscando itens com estoque baixo");
    return this.estoqueRepository.getLowStockItems();
  }

  async getOutOfStockItems(): Promise<EstoqueItem[]> {
    console.log("❌ SERVICE: Buscando itens sem estoque");
    return this.estoqueRepository.getOutOfStockItems();
  }

  async getOverstockItems(): Promise<EstoqueItem[]> {
    console.log("📈 SERVICE: Buscando itens com excesso de estoque");
    return this.estoqueRepository.getOverstockItems();
  }

  async getTotalValue(): Promise<number> {
    console.log("💰 SERVICE: Calculando valor total do estoque");
    return this.estoqueRepository.getTotalValue();
  }

  async getMovementsByPeriod(startDate: Date, endDate: Date): Promise<EstoqueMovimentacao[]> {
    console.log("📅 SERVICE: Buscando movimentações por período");
    return this.estoqueRepository.getMovementsByPeriod(startDate, endDate);
  }

  // Métodos auxiliares
  async getStockReport(): Promise<any> {
    console.log("📊 SERVICE: Gerando relatório completo de estoque");
    
    const overview = await this.getStockOverview();
    const lowStock = await this.getLowStockItems();
    const outOfStock = await this.getOutOfStockItems();
    const overstock = await this.getOverstockItems();
    const totalValue = await this.getTotalValue();

    return {
      overview,
      lowStock,
      outOfStock,
      overstock,
      totalValue,
      summary: {
        totalItems: overview.totalProducts,
        totalValue,
        criticalItems: outOfStock.length,
        warningItems: lowStock.length,
        excessItems: overstock.length
      }
    };
  }

  async getMovementsReport(startDate?: Date, endDate?: Date): Promise<any> {
    console.log("📋 SERVICE: Gerando relatório de movimentações");
    
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 dias atrás
    const end = endDate || new Date();
    
    const movements = await this.getMovementsByPeriod(start, end);
    
    const summary = {
      totalMovements: movements.length,
      totalIn: movements.filter(m => m.type === "in").reduce((sum, m) => sum + m.quantity, 0),
      totalOut: movements.filter(m => m.type === "out").reduce((sum, m) => sum + m.quantity, 0),
      totalAdjustments: movements.filter(m => m.type === "adjustment").length,
      totalValue: movements.reduce((sum, m) => sum + (m.totalCost || 0), 0)
    };

    return {
      movements,
      summary,
      period: { start, end }
    };
  }
}
