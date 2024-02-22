import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async create(@Body() payload: LoginAuthDto) {
    const profile = await this.authService.validate(
      payload.email,
      payload.password,
    );

    return this.authService.login(profile);
  }
}
