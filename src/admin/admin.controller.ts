import { Controller, Get, Param, Patch, Body, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { UpdateOrderStatusDto } from "../orders/dto/update-order-status.dto";
import { AssignResponsibleDto } from "./dto/assign-responsible.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("clients")
  findAllClients() {
    return this.adminService.findAllClients();
  }

  @Get("clients/:id")
  findClientById(@Param("id") id: string) {
    return this.adminService.findClientById(id);
  }

  @Get("orders")
  findAllOrders() {
    return this.adminService.findAllOrders();
  }

  @Patch("orders/:id/status")
  updateOrderStatus(
    @Param("id") id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.adminService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Patch("orders/:id/assign-responsible")
  assignResponsible(
    @Param("id") id: string,
    @Body() assignResponsibleDto: AssignResponsibleDto
  ) {
    return this.adminService.assignResponsible(
      id,
      assignResponsibleDto.responsibleName
    );
  }
}
