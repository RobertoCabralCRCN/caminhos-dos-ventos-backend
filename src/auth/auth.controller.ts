import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateClientDto } from "../clients/dto/create-client.dto";
import { LoginClientDto } from "../clients/dto/login-client.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() createClientDto: CreateClientDto) {
    console.log("🚀 ENDPOINT /auth/register CHAMADO");
    console.log("📝 Dados recebidos no controller:", JSON.stringify(createClientDto, null, 2));
    this.logger.log(
      `Register endpoint called with data: ${JSON.stringify(createClientDto)}`
    );
    
    try {
      const result = await this.authService.register(createClientDto);
      console.log("🎉 Registro concluído com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro no registro:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: any, @Body() loginClientDto: LoginClientDto) {
    console.log("🔐 ENDPOINT /auth/login CHAMADO");
    console.log("📝 Dados recebidos no controller:", JSON.stringify(loginClientDto, null, 2));
    this.logger.log(`Login endpoint called for user: ${loginClientDto.email}`);
    
    try {
      const result = await this.authService.login(req.user);
      console.log("✅ Login realizado com sucesso!");
      return result;
    } catch (error) {
      console.log("💥 Erro no login:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}
