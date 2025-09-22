import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.clientsService.findOneById(id);
  }
}
