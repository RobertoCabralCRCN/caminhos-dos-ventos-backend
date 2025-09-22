import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "../entities/client.entity";
import { IClientRepository } from "./repositories/client.repository.interface";
import { TypeOrmClientRepository } from "./repositories/typeorm-client.repository";
import { CLIENT_REPOSITORY } from "./repositories/client.repository.constant";

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    { provide: CLIENT_REPOSITORY, useClass: TypeOrmClientRepository },
  ],
  exports: [ClientsService, CLIENT_REPOSITORY],
})
export class ClientsModule {}
