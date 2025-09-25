import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClientsService } from '../clients/clients.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    console.log("👥 ENDPOINT GET /users CHAMADO");
    
    try {
      const result = this.clientsService.findAll();
      console.log("✅ Lista de usuários retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar usuários:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}

