import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { SignUpInput } from '../auth/auth.input';

export type CreateUserInput = SignUpInput;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(input: CreateUserInput) {
    return this.UserModel.create([input]);
  }

  async findOne(name: string) {
    return this.UserModel.findOne({ name });
  }
}
