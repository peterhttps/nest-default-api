import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/')
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }
}
