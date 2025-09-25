import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Cliente } from "./entities/client.entity";
import { Pedido } from "./entities/pedido.entity";
import { Usuario } from "./entities/usuario.entity";
import { Produto } from "./entities/produto.entity";
import { Avaliacao } from "./entities/avaliacao.entity";
import { Pagamento } from "./entities/pagamento.entity";
import { Notificacao } from "./entities/notificacao.entity";
import { Configuracao } from "./entities/configuracao.entity";
import { EstoqueItem } from "./entities/estoque-item.entity";
import { EstoqueMovimentacao } from "./entities/estoque-movimentacao.entity";
import { EstoqueAlerta } from "./entities/estoque-alerta.entity";
import { ClientsModule } from "./clients/clients.module";
import { AuthModule } from "./auth/auth.module";
import { OrdersModule } from "./orders/orders.module";
import { AdminModule } from "./admin/admin.module";
import { ProdutosModule } from "./produtos/produtos.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { MessagingModule } from "./messaging/messaging.module";
import { EstoqueModule } from "./estoque/estoque.module";
import { AppController } from "./app.controller";
import { HealthController } from "./health/health.controller";
import { UsersController } from "./users/users.controller";

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
      entities: [Cliente, Pedido, Usuario, Produto, Avaliacao, Pagamento, Notificacao, Configuracao, EstoqueItem, EstoqueMovimentacao, EstoqueAlerta],
      synchronize: true, // Should be false in production
    }),
    ClientsModule,
    AuthModule,
    OrdersModule,
    AdminModule,
    ProdutosModule,
    UsuariosModule,
    MessagingModule,
    EstoqueModule,
  ],
  controllers: [AppController, HealthController, UsersController],
})
export class AppModule {}
