import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, Min, IsEnum, IsArray } from "class-validator";
import { CategoriaProduto } from "../../entities/produto.entity";

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsNumber()
  @Min(0.01, { message: "O preço deve ser maior que zero" })
  preco!: number;

  @IsEnum(CategoriaProduto)
  categoria!: CategoriaProduto;

  @IsOptional()
  @IsString()
  emoji?: string;

  @IsOptional()
  @IsNumber()
  estoque?: number;

  @IsOptional()
  @IsNumber()
  estoqueMinimo?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagens?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
