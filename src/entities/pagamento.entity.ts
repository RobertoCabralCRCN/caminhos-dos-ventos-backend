import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

export enum MetodoPagamento {
  PIX = "pix",
  CREDIT = "credit",
  DEBIT = "debit",
  BOLETO = "boleto",
}

export enum StatusPagamento {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
}

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Pedido)
  pedido!: Pedido;

  @Column({
    type: "enum",
    enum: MetodoPagamento,
  })
  metodo!: MetodoPagamento;

  @Column("decimal", { precision: 10, scale: 2 })
  valor!: number;

  @Column({
    type: "enum",
    enum: StatusPagamento,
    default: StatusPagamento.PENDING,
  })
  status!: StatusPagamento;

  @Column("jsonb", { nullable: true })
  dadosPagamento!: any; // Dados específicos do método

  @Column({ nullable: true })
  codigoTransacao!: string;

  @Column({ nullable: true })
  dataPagamento!: Date;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}


