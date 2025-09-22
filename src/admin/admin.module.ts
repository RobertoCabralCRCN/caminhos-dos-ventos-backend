import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { ClientsModule } from "../clients/clients.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [ClientsModule, OrdersModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
