import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "./client.entity";
import { Usuario } from "./usuario.entity";

export enum TipoNotificacao {
  ORDER_UPDATE = "order_update",
  PAYMENT_CONFIRMED = "payment_confirmed",
  PRODUCT_AVAILABLE = "product_available",
  PROMOTION = "promotion",
}

@Entity()
export class Notificacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Cliente, { nullable: true })
  cliente?: Cliente;

  @ManyToOne(() => Usuario, { nullable: true })
  usuario?: Usuario;

  @Column({
    type: "enum",
    enum: TipoNotificacao,
  })
  tipo!: TipoNotificacao;

  @Column()
  titulo!: string;

  @Column("text")
  mensagem!: string;

  @Column({ default: false })
  lida!: boolean;

  @Column("jsonb", { nullable: true })
  dados!: any;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}


