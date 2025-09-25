import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

export enum ClienteRole {
  CLIENT = "client",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

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
  numero!: string;
  
  @Column()
  cidade!: string;
  
  @Column()
  cep!: string;
  
  @Column()
  telefone!: string;

  @Column({
    type: "enum",
    enum: ClienteRole,
    default: ClienteRole.CLIENT,
  })
  role!: ClienteRole;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
  
  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos!: Pedido[];
}
