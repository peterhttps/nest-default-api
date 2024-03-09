import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 13);

    return this.userRepository.create({
      ...createUserDto,
    });
  }

  async findById(id: string | Types.ObjectId) {
    return this.userRepository.findById(id);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
