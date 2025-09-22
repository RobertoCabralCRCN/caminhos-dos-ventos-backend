import { Injectable, Inject } from "@nestjs/common";
import { Cliente } from "../entities/client.entity";
import { CreateClientDto } from "./dto/create-client.dto";
import { IClientRepository } from "./repositories/client.repository.interface";
import { CLIENT_REPOSITORY } from "./repositories/client.repository.constant";

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientsRepository: IClientRepository
  ) {}

  async findOneByEmail(email: string): Promise<Cliente | null> {
    return this.clientsRepository.findOneByEmail(email);
  }

  async create(createClientDto: CreateClientDto): Promise<Cliente> {
    return this.clientsRepository.create(createClientDto);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientsRepository.findAll();
  }

  async findOneById(id: string): Promise<Cliente | null> {
    return this.clientsRepository.findOneById(id);
  }
}
