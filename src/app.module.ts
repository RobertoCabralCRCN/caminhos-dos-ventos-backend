import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Cliente } from "./entities/client.entity";
import { Pedido } from "./entities/pedido.entity";
import { ClientsModule } from "./clients/clients.module";
import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Cliente, Pedido],
      synchronize: false, // Should be false in production
    }),
    ClientsModule,
    AuthModule,
    OrdersModule,
    AdminModule,
  ],
})
export class AppModule {}
