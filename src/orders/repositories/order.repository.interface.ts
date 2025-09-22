import { Pedido } from "../../entities/pedido.entity";
import { CreateOrderDto } from "../dto/create-order.dto";

export interface IOrderRepository {
  save(pedido: Pedido): Promise<Pedido>;
  findOneById(id: string): Promise<Pedido | null>;
  findAll(): Promise<Pedido[]>;
  create(createOrderDto: CreateOrderDto, clienteId: string): Promise<Pedido>;
}
