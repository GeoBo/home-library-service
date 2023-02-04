import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { dbProvider } from 'src/db/db';

@Injectable()
export class UserService {
  constructor(@Inject(dbProvider) private readonly db: dbProvider) {}

  create({ login, password }: CreateUserDto): User {
    const newUser = new User({
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    this.db.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.db.users;
  }

  findOne(id: string): User {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto): User {
    const user = this.db.users.find((user) => user.id === id);
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
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    const deleted = this.db.users[userIndex];
    this.db.users.splice(userIndex, 1);
    return deleted;
  }
}
