import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuariosService } from "./usuarios.service";
import { UsuariosController } from "./usuarios.controller";
import { Usuario } from "../entities/usuario.entity";
import { IUsuarioRepository } from "./repositories/usuario.repository.interface";
import { TypeOrmUsuarioRepository } from "./repositories/typeorm-usuario.repository";
import { USUARIO_REPOSITORY } from "./repositories/usuario.repository.constant";

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    { provide: USUARIO_REPOSITORY, useClass: TypeOrmUsuarioRepository },
  ],
  exports: [UsuariosService, USUARIO_REPOSITORY],
})
export class UsuariosModule {}



