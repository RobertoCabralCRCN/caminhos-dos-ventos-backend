import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "./produto.entity";

export enum StatusEstoque {
  IN_STOCK = "in_stock",
  LOW_STOCK = "low_stock",
  OUT_OF_STOCK = "out_of_stock",
  OVERSTOCK = "overstock",
}

@Entity()
export class EstoqueItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Produto, { eager: true })
  produto!: Produto;

  @Column({ default: 0 })
  currentStock!: number;

  @Column({ default: 5 })
  minimumStock!: number;

  @Column({ default: 100 })
  maximumStock!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  unitCost!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalValue!: number;

  @Column({
    type: "enum",
    enum: StatusEstoque,
    default: StatusEstoque.OUT_OF_STOCK,
  })
  status!: StatusEstoque;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}



