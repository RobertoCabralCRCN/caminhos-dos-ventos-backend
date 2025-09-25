import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Cliente } from "./client.entity";

export enum PedidoStatus {
  AGUARDANDO_PAGAMENTO = "aguardando_pagamento",
  AGUARDANDO_PRODUCAO = "aguardando_producao",
  EM_PRODUCAO = "em_producao",
  PRONTO_ENTREGA = "pronto_entrega",
  ENTREGUE = "entregue",
  CANCELADO = "cancelado",
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
    default: PedidoStatus.AGUARDANDO_PAGAMENTO,
  })
  status!: PedidoStatus;
  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;
  @Column("decimal", { precision: 10, scale: 2 })
  taxaEntrega!: number;
  @Column({ nullable: true })
  responsavel!: string;
  @Column({ nullable: true })
  observacoes!: string;
  @Column({ nullable: true })
  enderecoEntrega!: string;
  @Column({ nullable: true })
  dataPagamento!: Date;
  @Column({ nullable: true })
  dataEntrega!: Date;
  @Column({ nullable: true })
  metodoPagamento!: string;
}
