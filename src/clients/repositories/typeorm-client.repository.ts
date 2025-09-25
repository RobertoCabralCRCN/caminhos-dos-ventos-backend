import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cliente } from "../../entities/client.entity";
import { CreateClientDto } from "../dto/create-client.dto";
import { IClientRepository } from "./client.repository.interface";

@Injectable()
export class TypeOrmClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Cliente)
    private clientsRepository: Repository<Cliente>
  ) {}

  async save(client: Cliente): Promise<Cliente> {
    return this.clientsRepository.save(client);
  }

  async findOneByEmail(email: string): Promise<Cliente | null> {
    return this.clientsRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<Cliente | null> {
    return this.clientsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientsRepository.find();
  }

  async create(createClientDto: CreateClientDto): Promise<Cliente> {
    console.log("💾 REPOSITORY: Criando entidade Cliente...");
    console.log("📊 Dados para criação:", JSON.stringify(createClientDto, null, 2));
    
    const client = this.clientsRepository.create(createClientDto);
    console.log("🏗️ Entidade criada:", JSON.stringify(client, null, 2));
    
    console.log("💿 Salvando no banco de dados...");
    const savedClient = await this.clientsRepository.save(client);
    console.log("✅ Cliente salvo no banco com ID:", savedClient.id);
    console.log("📋 Dados salvos:", JSON.stringify(savedClient, null, 2));
    
    return savedClient;
  }
}

