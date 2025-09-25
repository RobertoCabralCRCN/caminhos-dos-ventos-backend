import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UpdateOrderStatusDto } from "../orders/dto/update-order-status.dto";
import { AssignResponsibleDto } from "./dto/assign-responsible.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  private readonly logger = new Logger(AdminController.name);
  constructor(private readonly adminService: AdminService) {}

  @Get("clients")
  findAllClients() {
    console.log("👑 ENDPOINT GET /admin/clients CHAMADO");
    this.logger.log("findAllClients (Admin) endpoint called");
    
    try {
      const result = this.adminService.findAllClients();
      console.log("✅ Lista de clientes (admin) retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar clientes (admin):", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("clients/:id")
  findClientById(@Param("id") id: string) {
    console.log(`👑 ENDPOINT GET /admin/clients/${id} CHAMADO`);
    this.logger.log(`findClientById (Admin) endpoint called with ID: ${id}`);
    
    try {
      const result = this.adminService.findClientById(id);
      console.log(`✅ Cliente ${id} (admin) encontrado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao buscar cliente ${id} (admin):`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("orders")
  findAllOrders() {
    console.log("👑 ENDPOINT GET /admin/orders CHAMADO");
    this.logger.log("findAllOrders (Admin) endpoint called");
    
    try {
      const result = this.adminService.findAllOrders();
      console.log("✅ Lista de pedidos (admin) retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar pedidos (admin):", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch("orders/:id/status")
  updateOrderStatus(
    @Param("id") id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    console.log(`👑 ENDPOINT PATCH /admin/orders/${id}/status CHAMADO`);
    console.log("📝 Dados recebidos:", JSON.stringify(updateOrderStatusDto, null, 2));
    this.logger.log(
      `updateOrderStatus (Admin) endpoint called for order ID: ${id} with status: ${updateOrderStatusDto.status}`
    );
    
    try {
      const result = this.adminService.updateOrderStatus(id, updateOrderStatusDto);
      console.log(`✅ Status do pedido ${id} (admin) atualizado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao atualizar status do pedido ${id} (admin):`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch("orders/:id/assign-responsible")
  assignResponsible(
    @Param("id") id: string,
    @Body() assignResponsibleDto: AssignResponsibleDto
  ) {
    console.log(`👑 ENDPOINT PATCH /admin/orders/${id}/assign-responsible CHAMADO`);
    console.log("📝 Dados recebidos:", JSON.stringify(assignResponsibleDto, null, 2));
    this.logger.log(
      `assignResponsible (Admin) endpoint called for order ID: ${id} with responsible: ${assignResponsibleDto.responsibleName}`
    );
    
    try {
      const result = this.adminService.assignResponsible(
        id,
        assignResponsibleDto.responsibleName
      );
      console.log(`✅ Responsável do pedido ${id} (admin) atribuído com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao atribuir responsável do pedido ${id} (admin):`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
