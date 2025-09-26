import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "./client.entity";
import { Produto } from "./produto.entity";
import { Pedido } from "./pedido.entity";

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cliente)
  cliente!: Cliente;

  @ManyToOne(() => Produto)
  produto!: Produto;

  @ManyToOne(() => Pedido, { nullable: true })
  pedido?: Pedido;

  @Column({ type: "int", default: 5 })
  rating!: number; // 1-5

  @Column("text")
  comentario!: string;

  @Column({ default: false })
  verificada!: boolean;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}



