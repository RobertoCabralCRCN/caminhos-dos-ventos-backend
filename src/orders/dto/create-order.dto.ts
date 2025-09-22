import {
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  produto!: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade!: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  clienteId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  itens!: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  rua!: string;

  @IsString()
  @IsNotEmpty()
  cidade!: string;

  @IsString()
  @IsNotEmpty()
  cep!: string;
}
