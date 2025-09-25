import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pedido, PedidoStatus } from "../../entities/pedido.entity";
import { CreateOrderDto } from "../dto/create-order.dto";
import { IOrderRepository } from "./order.repository.interface";
import { ClientsService } from "../../clients/clients.service"; // Import ClientsService

@Injectable()
export class TypeOrmOrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Pedido)
    private ordersRepository: Repository<Pedido>,
    private clientsService: ClientsService // Inject ClientsService here
  ) {}

  async save(pedido: Pedido): Promise<Pedido> {
    return this.ordersRepository.save(pedido);
  }

  async findOneById(id: string): Promise<Pedido | null> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ["cliente"],
    });
  }

  async findAll(): Promise<Pedido[]> {
    return this.ordersRepository.find({ relations: ["cliente"] });
  }

  async create(
    createOrderDto: CreateOrderDto,
    clienteId: string
  ): Promise<Pedido> {
    const client = await this.clientsService.findOneById(clienteId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clienteId} not found`);
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

    const order = this.ordersRepository.create({
      ...createOrderDto,
      cliente: client,
      preco: totalPrice,
      taxaEntrega: deliveryFee,
      status: PedidoStatus.AGUARDANDO_PRODUCAO,
    });

    return this.ordersRepository.save(order);
  }
}

