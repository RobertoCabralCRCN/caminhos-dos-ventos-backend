import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
  Logger,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log("📦 ENDPOINT POST /orders CHAMADO");
    console.log("📝 Dados recebidos:", JSON.stringify(createOrderDto, null, 2));
    this.logger.log(
      `CreateOrder endpoint called with data: ${JSON.stringify(createOrderDto)}`
    );
    
    try {
      const result = this.ordersService.create(createOrderDto);
      console.log("✅ Pedido criado com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao criar pedido:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get()
  findAll() {
    console.log("📋 ENDPOINT GET /orders CHAMADO");
    this.logger.log("findAllOrders endpoint called");
    
    try {
      const result = this.ordersService.findAll();
      console.log("✅ Lista de pedidos retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar pedidos:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    console.log(`🔄 ENDPOINT PATCH /orders/${id}/status CHAMADO`);
    console.log("📝 Dados recebidos:", JSON.stringify(updateOrderStatusDto, null, 2));
    this.logger.log(
      `updateOrderStatus endpoint called for order ID: ${id} with status: ${updateOrderStatusDto.status}`
    );
    
    try {
      const result = this.ordersService.updateStatus(id, updateOrderStatusDto);
      console.log(`✅ Status do pedido ${id} atualizado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao atualizar status do pedido ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
