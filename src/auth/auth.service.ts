import { Injectable } from "@nestjs/common";
import { ClientsService } from "../clients/clients.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const client = await this.clientsService.findOneByEmail(email);
    if (client && (await bcrypt.compare(pass, client.senha))) {
      const { senha, ...result } = client;
      return result;
    }
    return null;
  }

  async login(client: any) {
    const payload = { username: client.email, sub: client.id, role: "client" };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(clientData: any) {
    const hashedPassword = await bcrypt.hash(clientData.senha, 10);
    const client = await this.clientsService.create({
      ...clientData,
      senha: hashedPassword,
    });
    const { senha, ...result } = client;
    return result;
  }
}
