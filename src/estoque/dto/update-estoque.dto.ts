import { IsNumber, IsOptional, Min } from "class-validator";

export class UpdateEstoqueDto {
  @IsOptional()
  @IsNumber()
  @Min(0, { message: "O estoque atual deve ser maior ou igual a zero" })
  currentStock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "O estoque mínimo deve ser maior ou igual a zero" })
  minimumStock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "O estoque máximo deve ser maior ou igual a zero" })
  maximumStock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: "O custo unitário deve ser maior ou igual a zero" })
  unitCost?: number;
}



