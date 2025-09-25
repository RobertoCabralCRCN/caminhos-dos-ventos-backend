import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SuperUserGuard } from "../common/guards/super-user.guard";

@Controller("produtos")
export class ProdutosController {
  private readonly logger = new Logger(ProdutosController.name);

  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, SuperUserGuard)
  create(@Body() createProdutoDto: CreateProdutoDto) {
    console.log("🛍️ ENDPOINT POST /produtos CHAMADO");
    console.log("📝 Dados recebidos:", JSON.stringify(createProdutoDto, null, 2));
    this.logger.log("Creating new product");
    
    try {
      const result = this.produtosService.create(createProdutoDto);
      console.log("✅ Produto criado com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao criar produto:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get()
  findAll() {
    console.log("🛍️ ENDPOINT GET /produtos CHAMADO");
    this.logger.log("Finding all products");
    
    try {
      const result = this.produtosService.findAll();
      console.log("✅ Lista de produtos retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar produtos:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("categoria/:categoria")
  findByCategoria(@Param("categoria") categoria: string) {
    console.log(`🛍️ ENDPOINT GET /produtos/categoria/${categoria} CHAMADO`);
    this.logger.log(`Finding products by category: ${categoria}`);
    
    try {
      const result = this.produtosService.findByCategoria(categoria);
      console.log(`✅ Produtos da categoria ${categoria} retornados com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao buscar produtos da categoria ${categoria}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    console.log(`🛍️ ENDPOINT GET /produtos/${id} CHAMADO`);
    this.logger.log(`Finding product with id: ${id}`);
    
    try {
      const result = this.produtosService.findOne(id);
      console.log(`✅ Produto ${id} encontrado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao buscar produto ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, SuperUserGuard)
  update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    console.log(`🛍️ ENDPOINT PATCH /produtos/${id} CHAMADO`);
    console.log("📝 Dados recebidos:", JSON.stringify(updateProdutoDto, null, 2));
    this.logger.log(`Updating product with id: ${id}`);
    
    try {
      const result = this.produtosService.update(id, updateProdutoDto);
      console.log(`✅ Produto ${id} atualizado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao atualizar produto ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, SuperUserGuard)
  remove(@Param("id") id: string) {
    console.log(`🛍️ ENDPOINT DELETE /produtos/${id} CHAMADO`);
    this.logger.log(`Removing product with id: ${id}`);
    
    try {
      const result = this.produtosService.remove(id);
      console.log(`✅ Produto ${id} removido com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao remover produto ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch(":id/deactivate")
  @UseGuards(JwtAuthGuard, SuperUserGuard)
  deactivate(@Param("id") id: string) {
    console.log(`🛍️ ENDPOINT PATCH /produtos/${id}/deactivate CHAMADO`);
    this.logger.log(`Deactivating product with id: ${id}`);
    
    try {
      const result = this.produtosService.softDelete(id);
      console.log(`✅ Produto ${id} desativado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao desativar produto ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
