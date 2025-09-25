import { Controller, Get, Param, UseGuards, Logger } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientsController {
  private readonly logger = new Logger(ClientsController.name);
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    console.log("👥 ENDPOINT GET /clients CHAMADO");
    this.logger.log("findAllClients endpoint called");
    
    try {
      const result = this.clientsService.findAll();
      console.log("✅ Lista de clientes retornada com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro ao buscar clientes:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    console.log(`🔍 ENDPOINT GET /clients/${id} CHAMADO`);
    this.logger.log(`findOneClientById endpoint called with ID: ${id}`);
    
    try {
      const result = this.clientsService.findOneById(id);
      console.log(`✅ Cliente ${id} encontrado com sucesso!`);
      return result;
    } catch (error) {
      console.log(`💥 Erro ao buscar cliente ${id}:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
