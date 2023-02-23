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
import { checkHash, getHash } from 'src/lib/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.users.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await getHash(createUserDto.password);
    const user = this.users.create({
      ...createUserDto,
      password,
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
    const isMatch = await checkHash(oldPassword, user.password);
    if (!isMatch) {
      throw new ForbiddenException(`Wrong old password`);
    }

    const newPasswordHash = await getHash(newPassword);
    const partialUser = {
      password: newPasswordHash,
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
