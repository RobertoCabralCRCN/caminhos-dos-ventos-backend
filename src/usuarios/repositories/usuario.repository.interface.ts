import { Usuario } from "../../entities/usuario.entity";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { UpdateUsuarioDto } from "../dto/update-usuario.dto";

export interface IUsuarioRepository {
  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findOne(id: string): Promise<Usuario | null>;
  findOneByEmail(email: string): Promise<Usuario | null>;
  update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario>;
  remove(id: string): Promise<void>;
  findSuperUsers(): Promise<Usuario[]>;
  findActiveUsers(): Promise<Usuario[]>;
}


