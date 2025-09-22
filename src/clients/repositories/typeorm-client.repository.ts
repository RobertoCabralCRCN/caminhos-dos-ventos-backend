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
    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }
}
