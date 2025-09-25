import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pedido } from "../entities/pedido.entity";
import { ClientsModule } from "../clients/clients.module";
import { MessagingModule } from "../messaging/messaging.module";
import { IOrderRepository } from "./repositories/order.repository.interface";
import { TypeOrmOrderRepository } from "./repositories/typeorm-order.repository";
import { ORDER_REPOSITORY } from "./repositories/order.repository.constant";

@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), ClientsModule, MessagingModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    { provide: ORDER_REPOSITORY, useClass: TypeOrmOrderRepository },
  ],
  exports: [OrdersService, ORDER_REPOSITORY],
})
export class OrdersModule {}
