import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { RequestWithUser } from '../types/requestWithUser';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const can = await super.canActivate(context);

    if (!can) {
      return false;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      return false;
    }

    const profile = await this.userService.findById(request.user._id);
    if (!profile) {
      return false;
    }

    request.user = profile;

    return true;
  }
}
