import { Produto } from "../../entities/produto.entity";
import { CreateProdutoDto } from "../dto/create-produto.dto";
import { UpdateProdutoDto } from "../dto/update-produto.dto";

export interface IProdutoRepository {
  create(createProdutoDto: CreateProdutoDto): Promise<Produto>;
  findAll(): Promise<Produto[]>;
  findOne(id: string): Promise<Produto | null>;
  update(id: string, updateProdutoDto: UpdateProdutoDto): Promise<Produto>;
  remove(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  findByCategoria(categoria: string): Promise<Produto[]>;
  findAtivos(): Promise<Produto[]>;
}


