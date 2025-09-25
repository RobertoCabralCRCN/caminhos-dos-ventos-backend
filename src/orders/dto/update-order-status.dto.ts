import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PedidoStatus } from "../../entities/pedido.entity";

export class UpdateOrderStatusDto {
  @IsEnum(PedidoStatus)
  @IsNotEmpty()
  status!: PedidoStatus;

  @IsOptional()
  @IsString()
  responsavel?: string;
}
