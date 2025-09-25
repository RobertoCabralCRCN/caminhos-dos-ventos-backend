import { Injectable, Inject } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";
import { IProdutoRepository } from "./repositories/produto.repository.interface";
import { PRODUTO_REPOSITORY } from "./repositories/produto.repository.constant";

@Injectable()
export class ProdutosService {
  constructor(
    @Inject(PRODUTO_REPOSITORY)
    private produtosRepository: IProdutoRepository
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    console.log("🛍️ SERVICE: Criando produto");
    return this.produtosRepository.create(createProdutoDto);
  }

  async findAll(): Promise<Produto[]> {
    console.log("📋 SERVICE: Listando todos os produtos");
    return this.produtosRepository.findAtivos();
  }

  async findOne(id: string): Promise<Produto | null> {
    console.log("🔍 SERVICE: Buscando produto:", id);
    return this.produtosRepository.findOne(id);
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    console.log("✏️ SERVICE: Atualizando produto:", id);
    return this.produtosRepository.update(id, updateProdutoDto);
  }

  async remove(id: string): Promise<void> {
    console.log("🗑️ SERVICE: Removendo produto:", id);
    return this.produtosRepository.remove(id);
  }

  async softDelete(id: string): Promise<void> {
    console.log("🔒 SERVICE: Desativando produto:", id);
    return this.produtosRepository.softDelete(id);
  }

  async findByCategoria(categoria: string): Promise<Produto[]> {
    console.log("🏷️ SERVICE: Buscando produtos por categoria:", categoria);
    return this.produtosRepository.findByCategoria(categoria);
  }
}
