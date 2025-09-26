import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SuperUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("🔐 SUPER USER GUARD - Verificando permissões");
    console.log("👤 Usuário:", user?.email);
    console.log("🔑 Super User:", user?.superUser);

    if (!user) {
      console.log("❌ Usuário não autenticado");
      throw new ForbiddenException("Usuário não autenticado");
    }

    if (!user.superUser) {
      console.log("❌ Usuário não é super user");
      throw new ForbiddenException("Apenas super usuários podem realizar esta ação");
    }

    if (!user.isActive) {
      console.log("❌ Usuário inativo");
      throw new ForbiddenException("Usuário inativo");
    }

    console.log("✅ Usuário autorizado como super user");
    return true;
  }
}



