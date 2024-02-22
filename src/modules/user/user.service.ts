import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private UserRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.UserRepository.findByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 13);

    return this.UserRepository.create({
      ...createUserDto,
    });
  }

  async findById(id: string | Types.ObjectId) {
    return this.UserRepository.findById(id);
  }

  async findAll() {
    return this.UserRepository.findAll();
  }

  async findByEmail(email: string) {
    return this.UserRepository.findByEmail(email);
  }
}
