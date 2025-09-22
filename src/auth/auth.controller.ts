import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateClientDto } from "../clients/dto/create-client.dto";
import { LoginClientDto } from "../clients/dto/login-client.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() createClientDto: CreateClientDto) {
    return this.authService.register(createClientDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: any, @Body() loginClientDto: LoginClientDto) {
    return this.authService.login(req.user);
  }
}
