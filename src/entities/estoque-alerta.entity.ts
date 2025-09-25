import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Produto } from "./produto.entity";

export enum SeveridadeAlerta {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum TipoAlerta {
  LOW_STOCK = "low_stock",
  OUT_OF_STOCK = "out_of_stock",
  OVERSTOCK = "overstock",
  EXPIRING = "expiring",
  EXPIRED = "expired",
}

@Entity()
export class EstoqueAlerta {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Produto, { eager: true })
  produto!: Produto;

  @Column({
    type: "enum",
    enum: TipoAlerta,
  })
  tipo!: TipoAlerta;

  @Column({
    type: "enum",
    enum: SeveridadeAlerta,
  })
  severidade!: SeveridadeAlerta;

  @Column()
  titulo!: string;

  @Column("text")
  mensagem!: string;

  @Column({ default: false })
  acknowledged!: boolean;

  @Column({ nullable: true })
  acknowledgedBy!: string;

  @Column({ nullable: true })
  acknowledgedAt!: Date;

  @Column("jsonb", { nullable: true })
  dados!: any;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}


