import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstoqueService } from "./estoque.service";
import { EstoqueController } from "./estoque.controller";
import { EstoqueItem } from "../entities/estoque-item.entity";
import { EstoqueMovimentacao } from "../entities/estoque-movimentacao.entity";
import { EstoqueAlerta } from "../entities/estoque-alerta.entity";
import { IEstoqueRepository } from "./repositories/estoque.repository.interface";
import { TypeOrmEstoqueRepository } from "./repositories/typeorm-estoque.repository";
import { ESTOQUE_REPOSITORY } from "./repositories/estoque.repository.constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstoqueItem,
      EstoqueMovimentacao,
      EstoqueAlerta
    ])
  ],
  controllers: [EstoqueController],
  providers: [
    EstoqueService,
    { provide: ESTOQUE_REPOSITORY, useClass: TypeOrmEstoqueRepository },
  ],
  exports: [EstoqueService, ESTOQUE_REPOSITORY],
})
export class EstoqueModule {}


