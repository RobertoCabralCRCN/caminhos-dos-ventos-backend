import { Injectable, Inject } from "@nestjs/common";
import { ClientsService } from "../clients/clients.service";
import { UsuariosService } from "../usuarios/usuarios.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // Primeiro tenta validar como usuário (admin)
    const usuario = await this.usuariosService.findOneByEmail(email);
    if (usuario && usuario.isActive && (await bcrypt.compare(pass, usuario.senha))) {
      const { senha, ...result } = usuario;
      return { ...result, userType: "usuario" };
    }

    // Se não for usuário, tenta validar como cliente
    const client = await this.clientsService.findOneByEmail(email);
    if (client && (await bcrypt.compare(pass, client.senha))) {
      const { senha, ...result } = client;
      return { ...result, userType: "cliente" };
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.email, 
      sub: user.id, 
      role: user.userType,
      superUser: user.superUser || false,
      isActive: user.isActive !== undefined ? user.isActive : true
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(clientData: any) {
    console.log("=== INICIANDO CRIAÇÃO DE USUÁRIO ===");
    console.log("Dados recebidos:", JSON.stringify(clientData, null, 2));
    
    // Verificar se usuário já existe
    const existingClient = await this.clientsService.findOneByEmail(clientData.email);
    if (existingClient) {
      console.log("❌ ERRO: Usuário já existe com este email:", clientData.email);
      throw new Error("Usuário já existe com este email");
    }
    console.log("✅ Email disponível:", clientData.email);
    
    // Criptografar senha
    console.log("🔐 Criptografando senha...");
    const hashedPassword = await bcrypt.hash(clientData.senha, 10);
    console.log("✅ Senha criptografada com sucesso");
    
    // Criar usuário
    console.log("👤 Criando usuário no banco de dados...");
    const client = await this.clientsService.create({
      ...clientData,
      senha: hashedPassword,
    });
    console.log("✅ Usuário criado com sucesso!");
    console.log("ID do usuário:", client.id);
    console.log("Nome:", client.nome);
    console.log("Email:", client.email);
    
    // Remover senha da resposta
    const { senha, ...result } = client;
    console.log("=== USUÁRIO CRIADO COM SUCESSO ===");
    return result;
  }
}
