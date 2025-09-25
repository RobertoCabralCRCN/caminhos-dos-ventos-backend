import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { Pedido, PedidoStatus } from "../entities/pedido.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { ClientsService } from "../clients/clients.service";
import { MessagingService } from "../messaging/messaging.service";
import { IOrderRepository } from "./repositories/order.repository.interface";
import { ORDER_REPOSITORY } from "./repositories/order.repository.constant";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private ordersRepository: IOrderRepository,
    private clientsService: ClientsService,
    private messagingService: MessagingService
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Pedido> {
    const client = await this.clientsService.findOneById(
      createOrderDto.clienteId
    );
    if (!client) {
      throw new NotFoundException(
        `Client with ID ${createOrderDto.clienteId} not found`
      );
    }

    let totalPrice = 0;
    for (const item of createOrderDto.itens) {
      totalPrice += item.quantidade * 10; // Placeholder price
    }

    let deliveryFee = 5; // Default fee
    if (createOrderDto.cidade.toLowerCase() === "sao paulo") {
      deliveryFee = 15;
    } else if (createOrderDto.cidade.toLowerCase() === "rio de janeiro") {
      deliveryFee = 12;
    }

    const newOrder = new Pedido();
    newOrder.cliente = client;
    newOrder.itens = createOrderDto.itens;
    newOrder.preco = totalPrice;
    newOrder.taxaEntrega = deliveryFee;
    newOrder.status = PedidoStatus.AGUARDANDO_PAGAMENTO;
    newOrder.enderecoEntrega = `${createOrderDto.rua}, ${createOrderDto.numero}, ${createOrderDto.cidade}`;

    const savedOrder = await this.ordersRepository.save(newOrder);

    // Enviar notificações
    try {
      // Notificar cliente via WhatsApp
      await this.messagingService.sendOrderConfirmationToClient(
        client.telefone,
        client.nome,
        savedOrder.id,
        totalPrice + deliveryFee
      );

      // Notificar admin (simulando dados do admin)
      await this.messagingService.sendOrderNotificationToAdmin(
        "admin@caminhodosventos.com", // Email do admin
        "+5511999999999", // Telefone do admin
        savedOrder.id,
        client.nome,
        totalPrice + deliveryFee,
        createOrderDto.itens
      );
    } catch (error) {
      console.error("Erro ao enviar notificações:", error);
      // Não falhar o pedido se a notificação falhar
    }

    return savedOrder;
  }

  async findAll(): Promise<Pedido[]> {
    return this.ordersRepository.findAll();
  }

  async findOneById(id: string): Promise<Pedido | null> {
    return this.ordersRepository.findOneById(id);
  }

  async save(pedido: Pedido): Promise<Pedido> {
    return this.ordersRepository.save(pedido);
  }

  async updateStatus(
    pedidoId: string,
    updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<Pedido> {
    const order = await this.ordersRepository.findOneById(pedidoId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${pedidoId} not found`);
    }

    const oldStatus = order.status;
    order.status = updateOrderStatusDto.status;
    
    if (updateOrderStatusDto.responsavel) {
      order.responsavel = updateOrderStatusDto.responsavel;
    }

    const savedOrder = await this.ordersRepository.save(order);

    // Enviar notificação de atualização de status para o cliente
    try {
      await this.messagingService.sendOrderStatusUpdate(
        order.cliente.telefone,
        order.cliente.nome,
        order.id,
        updateOrderStatusDto.status
      );
    } catch (error) {
      console.error("Erro ao enviar notificação de status:", error);
    }

    return savedOrder;
  }
}
