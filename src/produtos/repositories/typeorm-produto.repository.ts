import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Produto } from "../../entities/produto.entity";
import { CreateProdutoDto } from "../dto/create-produto.dto";
import { UpdateProdutoDto } from "../dto/update-produto.dto";
import { IProdutoRepository } from "./produto.repository.interface";

@Injectable()
export class TypeOrmProdutoRepository implements IProdutoRepository {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    console.log("💾 REPOSITORY: Criando entidade Produto...");
    console.log("📊 Dados para criação:", JSON.stringify(createProdutoDto, null, 2));
    
    const produto = this.produtosRepository.create(createProdutoDto);
    console.log("🏗️ Entidade criada:", JSON.stringify(produto, null, 2));
    
    console.log("💿 Salvando no banco de dados...");
    const savedProduto = await this.produtosRepository.save(produto);
    console.log("✅ Produto salvo no banco com ID:", savedProduto.id);
    console.log("📋 Dados salvos:", JSON.stringify(savedProduto, null, 2));
    
    return savedProduto;
  }

  async findAll(): Promise<Produto[]> {
    console.log("📋 REPOSITORY: Buscando todos os produtos");
    return this.produtosRepository.find({
      order: { dataCriacao: "DESC" }
    });
  }

  async findOne(id: string): Promise<Produto | null> {
    console.log("🔍 REPOSITORY: Buscando produto por ID:", id);
    return this.produtosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    console.log("✏️ REPOSITORY: Atualizando produto:", id, JSON.stringify(updateProdutoDto, null, 2));
    
    await this.produtosRepository.update(id, updateProdutoDto);
    const updatedProduto = await this.findOne(id);
    
    console.log("✅ REPOSITORY: Produto atualizado:", id);
    return updatedProduto!;
  }

  async remove(id: string): Promise<void> {
    console.log("🗑️ REPOSITORY: Removendo produto:", id);
    await this.produtosRepository.delete(id);
    console.log("✅ REPOSITORY: Produto removido:", id);
  }

  async softDelete(id: string): Promise<void> {
    console.log("🔒 REPOSITORY: Desativando produto:", id);
    await this.produtosRepository.update(id, { ativo: false });
    console.log("✅ REPOSITORY: Produto desativado:", id);
  }

  async findByCategoria(categoria: string): Promise<Produto[]> {
    console.log("🏷️ REPOSITORY: Buscando produtos por categoria:", categoria);
    return this.produtosRepository.find({
      where: { categoria: categoria as any, ativo: true },
      order: { dataCriacao: "DESC" }
    });
  }

  async findAtivos(): Promise<Produto[]> {
    console.log("✅ REPOSITORY: Buscando produtos ativos");
    return this.produtosRepository.find({
      where: { ativo: true },
      order: { dataCriacao: "DESC" }
    });
  }
}
