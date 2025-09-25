import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request, 
  Logger 
} from "@nestjs/common";
import { EstoqueService } from "./estoque.service";
import { CreateMovimentacaoDto } from "./dto/create-movimentacao.dto";
import { UpdateEstoqueDto } from "./dto/update-estoque.dto";
import { AjusteEstoqueDto } from "./dto/ajuste-estoque.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SuperUserGuard } from "../common/guards/super-user.guard";

@Controller("stock")
@UseGuards(JwtAuthGuard, SuperUserGuard)
export class EstoqueController {
  private readonly logger = new Logger(EstoqueController.name);

  constructor(private readonly estoqueService: EstoqueService) {}

  // Gestão de Itens de Estoque
  @Get("items")
  async findAllItems() {
    console.log("📦 ENDPOINT GET /stock/items CHAMADO");
    this.logger.log("Finding all stock items");
    
    try {
      const result = await this.estoqueService.findAllItems();
      console.log("✅ Itens de estoque retornados com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar itens de estoque:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("items/:productId")
  async findItemByProductId(@Param("productId") productId: string) {
    console.log("🚀 ENDPOINT GET /stock/items/:productId CHAMADO", productId);
    this.logger.log(`Finding stock item for product: ${productId}`);
    return this.estoqueService.findItemByProductId(productId);
  }

  @Put("items/:productId")
  async updateItem(
    @Param("productId") productId: string,
    @Body() updateDto: UpdateEstoqueDto
  ) {
    console.log("🚀 ENDPOINT PUT /stock/items/:productId CHAMADO", productId);
    this.logger.log(`Updating stock item for product: ${productId}`);
    return this.estoqueService.updateItem(productId, updateDto);
  }

  @Delete("items/:productId")
  async deleteItem(@Param("productId") productId: string) {
    console.log("🚀 ENDPOINT DELETE /stock/items/:productId CHAMADO", productId);
    this.logger.log(`Deleting stock item for product: ${productId}`);
    return this.estoqueService.deleteItem(productId);
  }

  // Movimentações
  @Get("movements")
  async findAllMovements() {
    console.log("📦 ENDPOINT GET /stock/movements CHAMADO");
    this.logger.log("Finding all stock movements");
    
    try {
      const result = await this.estoqueService.findAllMovements();
      console.log("✅ Movimentações de estoque retornadas com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar movimentações:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("movements/product/:productId")
  async findMovementsByProduct(@Param("productId") productId: string) {
    console.log("🚀 ENDPOINT GET /stock/movements/product/:productId CHAMADO", productId);
    this.logger.log(`Finding movements for product: ${productId}`);
    return this.estoqueService.findMovementsByProduct(productId);
  }

  @Post("movements")
  async createMovement(
    @Body() createDto: CreateMovimentacaoDto,
    @Request() req: any
  ) {
    console.log("🚀 ENDPOINT POST /stock/movements CHAMADO");
    this.logger.log("Creating stock movement");
    return this.estoqueService.createMovement(createDto, req.user.id);
  }

  @Post("adjustments")
  async ajustarEstoque(
    @Body() ajusteDto: AjusteEstoqueDto,
    @Request() req: any
  ) {
    console.log("🚀 ENDPOINT POST /stock/adjustments CHAMADO");
    this.logger.log("Adjusting stock");
    return this.estoqueService.ajustarEstoque(ajusteDto, req.user.id);
  }

  // Alertas
  @Get("alerts")
  async findAllAlerts() {
    console.log("📦 ENDPOINT GET /stock/alerts CHAMADO");
    this.logger.log("Finding all stock alerts");
    
    try {
      const result = await this.estoqueService.findAllAlerts();
      console.log("✅ Alertas de estoque retornados com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar alertas:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("alerts/unacknowledged")
  async findUnacknowledgedAlerts() {
    console.log("🚀 ENDPOINT GET /stock/alerts/unacknowledged CHAMADO");
    this.logger.log("Finding unacknowledged alerts");
    return this.estoqueService.findUnacknowledgedAlerts();
  }

  @Put("alerts/:id/acknowledge")
  async acknowledgeAlert(
    @Param("id") alertId: string,
    @Request() req: any
  ) {
    console.log("🚀 ENDPOINT PUT /stock/alerts/:id/acknowledge CHAMADO", alertId);
    this.logger.log(`Acknowledging alert: ${alertId}`);
    return this.estoqueService.acknowledgeAlert(alertId, req.user.id);
  }

  // Relatórios
  @Get("reports/overview")
  async getStockOverview() {
    console.log("📦 ENDPOINT GET /stock/reports/overview CHAMADO");
    this.logger.log("Getting stock overview");
    
    try {
      const result = await this.estoqueService.getStockOverview();
      console.log("✅ Relatório de visão geral do estoque retornado com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao gerar relatório de visão geral:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("reports/complete")
  async getStockReport() {
    console.log("🚀 ENDPOINT GET /stock/reports/complete CHAMADO");
    this.logger.log("Getting complete stock report");
    return this.estoqueService.getStockReport();
  }

  @Get("reports/movements")
  async getMovementsReport(
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    console.log("🚀 ENDPOINT GET /stock/reports/movements CHAMADO");
    this.logger.log("Getting movements report");
    
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    
    return this.estoqueService.getMovementsReport(start, end);
  }

  @Get("reports/low-stock")
  async getLowStockItems() {
    console.log("🚀 ENDPOINT GET /stock/reports/low-stock CHAMADO");
    this.logger.log("Getting low stock items");
    return this.estoqueService.getLowStockItems();
  }

  @Get("reports/out-of-stock")
  async getOutOfStockItems() {
    console.log("🚀 ENDPOINT GET /stock/reports/out-of-stock CHAMADO");
    this.logger.log("Getting out of stock items");
    return this.estoqueService.getOutOfStockItems();
  }

  @Get("reports/overstock")
  async getOverstockItems() {
    console.log("🚀 ENDPOINT GET /stock/reports/overstock CHAMADO");
    this.logger.log("Getting overstock items");
    return this.estoqueService.getOverstockItems();
  }

  @Get("reports/value")
  async getTotalValue() {
    console.log("🚀 ENDPOINT GET /stock/reports/value CHAMADO");
    this.logger.log("Getting total stock value");
    return { totalValue: await this.estoqueService.getTotalValue() };
  }

  // Exportar relatórios
  @Get("export/movements")
  async exportMovements(
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ) {
    console.log("🚀 ENDPOINT GET /stock/export/movements CHAMADO");
    this.logger.log("Exporting movements report");
    
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    
    const report = await this.estoqueService.getMovementsReport(start, end);
    
    // Aqui você pode implementar a exportação para CSV, Excel, etc.
    return {
      message: "Relatório de movimentações exportado com sucesso",
      data: report,
      exportDate: new Date(),
      format: "JSON" // Pode ser CSV, Excel, PDF, etc.
    };
  }
}

