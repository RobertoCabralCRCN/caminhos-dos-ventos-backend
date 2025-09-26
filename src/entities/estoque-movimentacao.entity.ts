import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "./produto.entity";
import { Usuario } from "./usuario.entity";
import { Cliente } from "./client.entity";

export enum TipoMovimentacao {
  IN = "in",
  OUT = "out",
  ADJUSTMENT = "adjustment",
  TRANSFER = "transfer",
}

export enum MotivoMovimentacao {
  PURCHASE = "purchase",
  SALE = "sale",
  RETURN = "return",
  DAMAGE = "damage",
  INVENTORY = "inventory",
  ADJUSTMENT = "adjustment",
  TRANSFER = "transfer",
  PRODUCTION = "production",
  DONATION = "donation",
  LOSS = "loss",
}

@Entity()
export class EstoqueMovimentacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Produto, { eager: true })
  produto!: Produto;

  @Column({
    type: "enum",
    enum: TipoMovimentacao,
  })
  type!: TipoMovimentacao;

  @Column({ type: "int" })
  quantity!: number;

  @Column({
    type: "enum",
    enum: MotivoMovimentacao,
  })
  reason!: MotivoMovimentacao;

  @Column({ nullable: true })
  reference!: string; // Referência externa (pedido, nota fiscal, etc.)

  @ManyToOne(() => Usuario, { nullable: true })
  usuario?: Usuario;

  @ManyToOne(() => Cliente, { nullable: true })
  cliente?: Cliente;

  @Column({ nullable: true })
  notes!: string;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  unitCost!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  totalCost!: number;

  @Column({ default: 0 })
  stockBefore!: number;

  @Column({ default: 0 })
  stockAfter!: number;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}



