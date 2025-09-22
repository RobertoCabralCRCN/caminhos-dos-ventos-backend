import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  nome!: string;
  @Column({ unique: true })
  email!: string;
  @Column()
  senha!: string;
  @Column()
  rua!: string;
  @Column()
  cidade!: string;
  @Column()
  cep!: string;
  @Column()
  telefone!: string;
  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos!: Pedido[];
}
