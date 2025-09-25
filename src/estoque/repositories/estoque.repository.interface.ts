import { EstoqueItem } from "../../entities/estoque-item.entity";
import { EstoqueMovimentacao } from "../../entities/estoque-movimentacao.entity";
import { EstoqueAlerta } from "../../entities/estoque-alerta.entity";
import { UpdateEstoqueDto } from "../dto/update-estoque.dto";
import { CreateMovimentacaoDto } from "../dto/create-movimentacao.dto";

export interface IEstoqueRepository {
  // Estoque Items
  findAllItems(): Promise<EstoqueItem[]>;
  findItemByProductId(productId: string): Promise<EstoqueItem | null>;
  createItem(productId: string): Promise<EstoqueItem>;
  updateItem(productId: string, updateDto: UpdateEstoqueDto): Promise<EstoqueItem>;
  deleteItem(productId: string): Promise<void>;
  
  // Movimentações
  findAllMovements(): Promise<EstoqueMovimentacao[]>;
  findMovementsByProduct(productId: string): Promise<EstoqueMovimentacao[]>;
  createMovement(createDto: CreateMovimentacaoDto, userId: string): Promise<EstoqueMovimentacao>;
  
  // Alertas
  findAllAlerts(): Promise<EstoqueAlerta[]>;
  findUnacknowledgedAlerts(): Promise<EstoqueAlerta[]>;
  createAlert(alert: Partial<EstoqueAlerta>): Promise<EstoqueAlerta>;
  acknowledgeAlert(alertId: string, userId: string): Promise<EstoqueAlerta>;
  
  // Relatórios
  getStockOverview(): Promise<any>;
  getLowStockItems(): Promise<EstoqueItem[]>;
  getOutOfStockItems(): Promise<EstoqueItem[]>;
  getOverstockItems(): Promise<EstoqueItem[]>;
  getTotalValue(): Promise<number>;
  getMovementsByPeriod(startDate: Date, endDate: Date): Promise<EstoqueMovimentacao[]>;
}


