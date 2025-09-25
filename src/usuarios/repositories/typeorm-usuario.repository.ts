import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../../entities/usuario.entity";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { UpdateUsuarioDto } from "../dto/update-usuario.dto";
import { IUsuarioRepository } from "./usuario.repository.interface";

@Injectable()
export class TypeOrmUsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    console.log("💾 REPOSITORY: Criando entidade Usuario...");
    console.log("📊 Dados para criação:", JSON.stringify(createUsuarioDto, null, 2));
    
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    console.log("🏗️ Entidade criada:", JSON.stringify(usuario, null, 2));
    
    console.log("💿 Salvando no banco de dados...");
    const savedUsuario = await this.usuariosRepository.save(usuario);
    console.log("✅ Usuario salvo no banco com ID:", savedUsuario.id);
    console.log("📋 Dados salvos:", JSON.stringify(savedUsuario, null, 2));
    
    return savedUsuario;
  }

  async findAll(): Promise<Usuario[]> {
    console.log("📋 REPOSITORY: Buscando todos os usuários");
    return this.usuariosRepository.find({
      order: { dataCriacao: "DESC" }
    });
  }

  async findOne(id: string): Promise<Usuario | null> {
    console.log("🔍 REPOSITORY: Buscando usuário por ID:", id);
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    console.log("🔍 REPOSITORY: Buscando usuário por email:", email);
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    console.log("✏️ REPOSITORY: Atualizando usuário:", id, JSON.stringify(updateUsuarioDto, null, 2));
    
    await this.usuariosRepository.update(id, updateUsuarioDto);
    const updatedUsuario = await this.findOne(id);
    
    console.log("✅ REPOSITORY: Usuario atualizado:", id);
    return updatedUsuario!;
  }

  async remove(id: string): Promise<void> {
    console.log("🗑️ REPOSITORY: Removendo usuário:", id);
    await this.usuariosRepository.delete(id);
    console.log("✅ REPOSITORY: Usuario removido:", id);
  }

  async findSuperUsers(): Promise<Usuario[]> {
    console.log("👑 REPOSITORY: Buscando super usuários");
    return this.usuariosRepository.find({
      where: { superUser: true, isActive: true },
      order: { dataCriacao: "DESC" }
    });
  }

  async findActiveUsers(): Promise<Usuario[]> {
    console.log("✅ REPOSITORY: Buscando usuários ativos");
    return this.usuariosRepository.find({
      where: { isActive: true },
      order: { dataCriacao: "DESC" }
    });
  }
}


