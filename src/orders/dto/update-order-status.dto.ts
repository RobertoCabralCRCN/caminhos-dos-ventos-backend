import { IsEnum, IsNotEmpty } from "class-validator";
import { PedidoStatus } from "../../entities/pedido.entity";

export class UpdateOrderStatusDto {
  @IsEnum(PedidoStatus)
  @IsNotEmpty()
  status!: PedidoStatus;
}
