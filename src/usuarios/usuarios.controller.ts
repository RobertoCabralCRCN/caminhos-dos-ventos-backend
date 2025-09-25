import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SuperUserGuard } from "../common/guards/super-user.guard";

@Controller("usuarios")
@UseGuards(JwtAuthGuard, SuperUserGuard)
export class UsuariosController {
  private readonly logger = new Logger(UsuariosController.name);

  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    console.log("👤 ENDPOINT POST /usuarios CHAMADO");
    console.log("📝 Dados recebidos:", JSON.stringify(createUsuarioDto, null, 2));
    this.logger.log("Creating new user");
    
    try {
      const result = this.usuariosService.create(createUsuarioDto);
      console.log("✅ Usuário criado com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao criar usuário:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get()
  findAll() {
    console.log("👤 ENDPOINT GET /usuarios CHAMADO");
    this.logger.log("Finding all users");
    
    try {
      const result = this.usuariosService.findAll();
      console.log("✅ Lista de usuários retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar usuários:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("super-users")
  findSuperUsers() {
    console.log("👤 ENDPOINT GET /usuarios/super-users CHAMADO");
    this.logger.log("Finding super users");
    
    try {
      const result = this.usuariosService.findSuperUsers();
      console.log("✅ Super usuários retornados com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar super usuários:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get("active")
  findActiveUsers() {
    console.log("👤 ENDPOINT GET /usuarios/active CHAMADO");
    this.logger.log("Finding active users");
    
    try {
      const result = this.usuariosService.findActiveUsers();
      console.log("✅ Usuários ativos retornados com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar usuários ativos:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    console.log(`👤 ENDPOINT GET /usuarios/${id} CHAMADO`);
    this.logger.log(`Finding user with id: ${id}`);
    
    try {
      const result = this.usuariosService.findOne(id);
      console.log(`✅ Usuário ${id} encontrado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao buscar usuário ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    console.log(`👤 ENDPOINT PATCH /usuarios/${id} CHAMADO`);
    console.log("📝 Dados recebidos:", JSON.stringify(updateUsuarioDto, null, 2));
    this.logger.log(`Updating user with id: ${id}`);
    
    try {
      const result = this.usuariosService.update(id, updateUsuarioDto);
      console.log(`✅ Usuário ${id} atualizado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao atualizar usuário ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    console.log(`👤 ENDPOINT DELETE /usuarios/${id} CHAMADO`);
    this.logger.log(`Removing user with id: ${id}`);
    
    try {
      const result = this.usuariosService.remove(id);
      console.log(`✅ Usuário ${id} removido com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao remover usuário ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}

