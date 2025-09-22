import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Cliente } from "./client.entity";

export enum PedidoStatus {
  AGUARDANDO_PRODUCAO = "aguardando_producao",
  PRONTO = "pronto",
  ENTREGUE = "entregue",
}

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente!: Cliente;
  @Column("jsonb")
  itens!: { produto: string; quantidade: number }[];
  @CreateDateColumn()
  dataCriacao!: Date;
  @Column({
    type: "enum",
    enum: PedidoStatus,
    default: PedidoStatus.AGUARDANDO_PRODUCAO,
  })
  status!: PedidoStatus;
  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;
  @Column("decimal", { precision: 10, scale: 2 })
  taxaEntrega!: number;
  @Column({ nullable: true })
  responsavel!: string;
}
