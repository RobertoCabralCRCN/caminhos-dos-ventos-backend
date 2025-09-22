import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientsService } from "../clients/clients.service";
import { OrdersService } from "../orders/orders.service";
import { Cliente } from "../entities/client.entity";
import { Pedido } from "../entities/pedido.entity";
import { UpdateOrderStatusDto } from "../orders/dto/update-order-status.dto";

@Injectable()
export class AdminService {
  constructor(
    private clientsService: ClientsService,
    private ordersService: OrdersService
  ) {}

  async findAllClients(): Promise<Cliente[]> {
    // Assuming ClientsService has a findAll method
    // For MVP, if not implemented, we can add it later or retrieve directly from repository
    // For now, let's just return an empty array or throw an error if not implemented in ClientsService
    return this.clientsService.findAll(); // Assuming ClientsService has a findAll method
  }

  async findClientById(id: string): Promise<Cliente | null> {
    // Assuming ClientsService has a findOneById method
    return this.clientsService.findOneById(id); // Assuming ClientsService has a findOneById method
  }

  async findAllOrders(): Promise<Pedido[]> {
    return this.ordersService.findAll();
  }

  async updateOrderStatus(
    orderId: string,
    updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<Pedido> {
    return this.ordersService.updateStatus(orderId, updateOrderStatusDto);
  }

  async assignResponsible(
    orderId: string,
    responsibleName: string
  ): Promise<Pedido> {
    const order = await this.ordersService.findOneById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    order.responsavel = responsibleName;
    return this.ordersService.save(order);
  }
}
