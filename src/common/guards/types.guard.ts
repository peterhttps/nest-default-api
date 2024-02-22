import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const types = this.reflector.get<string[]>('types', context.getHandler());

    if (!types) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return types.some((role) => user.type?.includes(role));
  }
}
