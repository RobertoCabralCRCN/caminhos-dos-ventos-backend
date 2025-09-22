import { Cliente } from "../../entities/client.entity";
import { CreateClientDto } from "../dto/create-client.dto";

export interface IClientRepository {
  save(client: Cliente): Promise<Cliente>;
  findOneByEmail(email: string): Promise<Cliente | null>;
  findOneById(id: string): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
  create(createClientDto: CreateClientDto): Promise<Cliente>;
}
