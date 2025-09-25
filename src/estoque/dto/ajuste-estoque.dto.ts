import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsUUID, Min } from "class-validator";
import { MotivoMovimentacao } from "../../entities/estoque-movimentacao.entity";

export class AjusteEstoqueDto {
  @IsUUID()
  @IsNotEmpty()
  produtoId!: string;

  @IsNumber()
  @Min(0, { message: "O novo estoque deve ser maior ou igual a zero" })
  newStock!: number;

  @IsEnum(MotivoMovimentacao)
  @IsNotEmpty()
  reason!: MotivoMovimentacao;

  @IsOptional()
  @IsString()
  notes?: string;
}


