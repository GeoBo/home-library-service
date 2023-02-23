import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.users.findOneBy({ login: username });
    if (!user || user.password !== password) {
      throw new ForbiddenException();
    }
    //delete user.password;

    const payload = { username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
    //return user;
  }
}
