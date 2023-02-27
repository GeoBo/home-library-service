import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ForbiddenException,
  NotFoundException,
  // BadRequestException,
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
    // const { login } = createUserDto;
    // const user = await this.users.findOneBy({ login });
    // if (user) {
    //   throw new BadRequestException(
    //     `User with login: "${login}" already exists`,
    //   );
    // }
    const currentTime = new Date().getTime();

    const password = await getHash(createUserDto.password);
    const newUser = this.users.create({
      ...createUserDto,
      password,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    return this.users.save(newUser);
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
