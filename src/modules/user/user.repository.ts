import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(payload: CreateUserDto) {
    return this.userModel.create({
      ...payload,
    });
  }

  async findById(id: string | Types.ObjectId) {
    return this.userModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findAll() {
    return this.userModel.find({});
  }
}
