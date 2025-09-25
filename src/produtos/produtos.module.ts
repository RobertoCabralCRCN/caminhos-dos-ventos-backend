import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutosService } from "./produtos.service";
import { ProdutosController } from "./produtos.controller";
import { Produto } from "../entities/produto.entity";
import { IProdutoRepository } from "./repositories/produto.repository.interface";
import { TypeOrmProdutoRepository } from "./repositories/typeorm-produto.repository";
import { PRODUTO_REPOSITORY } from "./repositories/produto.repository.constant";

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [
    ProdutosService,
    { provide: PRODUTO_REPOSITORY, useClass: TypeOrmProdutoRepository },
  ],
  exports: [ProdutosService, PRODUTO_REPOSITORY],
})
export class ProdutosModule {}
