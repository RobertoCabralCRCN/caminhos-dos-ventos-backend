﻿import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>("roles", context.getHandler());
    if (!required) return true;
    const { user } = context.switchToHttp().getRequest();
    return user && required.includes(user.role);
  }
}
