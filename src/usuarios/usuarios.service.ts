import { Injectable, Inject } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { IUsuarioRepository } from "./repositories/usuario.repository.interface";
import { USUARIO_REPOSITORY } from "./repositories/usuario.repository.constant";

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private usuariosRepository: IUsuarioRepository
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    console.log("👤 SERVICE: Criando usuário");
    return this.usuariosRepository.create(createUsuarioDto);
  }

  async findAll(): Promise<Usuario[]> {
    console.log("📋 SERVICE: Listando todos os usuários");
    return this.usuariosRepository.findAll();
  }

  async findOne(id: string): Promise<Usuario | null> {
    console.log("🔍 SERVICE: Buscando usuário:", id);
    return this.usuariosRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    console.log("🔍 SERVICE: Buscando usuário por email:", email);
    return this.usuariosRepository.findOneByEmail(email);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    console.log("✏️ SERVICE: Atualizando usuário:", id);
    return this.usuariosRepository.update(id, updateUsuarioDto);
  }

  async remove(id: string): Promise<void> {
    console.log("🗑️ SERVICE: Removendo usuário:", id);
    return this.usuariosRepository.remove(id);
  }

  async findSuperUsers(): Promise<Usuario[]> {
    console.log("👑 SERVICE: Buscando super usuários");
    return this.usuariosRepository.findSuperUsers();
  }

  async findActiveUsers(): Promise<Usuario[]> {
    console.log("✅ SERVICE: Buscando usuários ativos");
    return this.usuariosRepository.findActiveUsers();
  }
}



