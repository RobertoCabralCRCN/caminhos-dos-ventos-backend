import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsUUID, Min } from "class-validator";
import { TipoMovimentacao, MotivoMovimentacao } from "../../entities/estoque-movimentacao.entity";

export class CreateMovimentacaoDto {
  @IsUUID()
  @IsNotEmpty()
  produtoId!: string;

  @IsEnum(TipoMovimentacao)
  @IsNotEmpty()
  type!: TipoMovimentacao;

  @IsNumber()
  @Min(1, { message: "A quantidade deve ser maior que zero" })
  quantity!: number;

  @IsEnum(MotivoMovimentacao)
  @IsNotEmpty()
  reason!: MotivoMovimentacao;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "O custo unitário deve ser maior ou igual a zero" })
  unitCost?: number;

  @IsOptional()
  @IsUUID()
  clienteId?: string;
}


