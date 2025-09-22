import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }
}
