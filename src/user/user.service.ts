import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { DB } from 'src/db/db';

@Injectable()
export class UserService {
  //private readonly users: User[] = [];
  private readonly users = new DB().users;

  create({ login, password }: CreateUserDto): User {
    const newUser = new User({
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Wrong password`);
    }
    user.password = newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();
    return user;
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const deleted = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return deleted;
  }
}
