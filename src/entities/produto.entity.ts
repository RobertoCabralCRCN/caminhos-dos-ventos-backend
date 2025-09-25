import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum CategoriaProduto {
  VELAS = "velas",
  GUIAS = "guias",
  BRAJAS = "brajas",
  DEFUMADORES = "defumadores",
}

@Entity()
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  nome!: string;

  @Column("text")
  descricao!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;

  @Column({
    type: "enum",
    enum: CategoriaProduto,
  })
  categoria!: CategoriaProduto;

  @Column({ nullable: true })
  emoji!: string;

  @Column({ default: 0 })
  estoque!: number;

  @Column({ default: 5 })
  estoqueMinimo!: number;

  @Column({ default: true })
  ativo!: boolean;

  @Column("text", { array: true, default: [] })
  imagens!: string[];

  @Column("text", { array: true, default: [] })
  tags!: string[];

  @CreateDateColumn()
  dataCriacao!: Date;

  @UpdateDateColumn()
  dataAtualizacao!: Date;
}
