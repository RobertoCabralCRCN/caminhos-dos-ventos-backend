import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum CategoriaConfiguracao {
  PAYMENT = "payment",
  DELIVERY = "delivery",
  GENERAL = "general",
  THEME = "theme",
}

@Entity()
export class Configuracao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  chave!: string;

  @Column("text")
  valor!: string;

  @Column("text", { nullable: true })
  descricao!: string;

  @Column({
    type: "enum",
    enum: CategoriaConfiguracao,
    default: CategoriaConfiguracao.GENERAL,
  })
  categoria!: CategoriaConfiguracao;

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}


