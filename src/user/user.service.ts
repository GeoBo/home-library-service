import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.users.find();
  }

  create({ login, password }: CreateUserDto): Promise<User> {
    const user = this.users.create({
      login,
      password,
      //version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    return this.users.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.users.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Wrong old password`);
    }

    const partialUser = {
      password: newPassword,
      updatedAt: new Date().getTime(),
    };

    this.users.merge(user, partialUser);

    return this.users.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return await this.users.remove(user);
  }
}
