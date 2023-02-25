import { TokenService } from './../lib/token/token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import {
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { checkHash } from 'src/lib/crypto';
import { JWTTokenPayload } from 'src/lib/interfaces/JWTTokenPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.users.findOneBy({ login: username });
    const isMatch = await checkHash(password, user.password);
    if (!user || !isMatch) {
      throw new ForbiddenException();
    }

    const payload = { username, sub: user.id };

    const tokens = await this.getTokens(payload);
    return tokens;
  }

  async validateRefreshToken(authHeader: string, refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException();
    const secret = process.env.JWT_SECRET_REFRESH_KEY;
    const decoded = await this.jwtService
      .verifyAsync(refreshToken, { secret })
      .catch(() => {
        throw new ForbiddenException();
      });
    if (!this.tokenService.isValid(refreshToken)) {
      throw new ForbiddenException('Blacklisted token');
    }
    const accessToken = authHeader.split(' ')[1];
    this.tokenService.add(accessToken);
    this.tokenService.add(refreshToken);

    const payload = { username: decoded.username, sub: decoded.id };
    const tokens = await this.getTokens(payload);
    return tokens;
  }

  async getTokens(payload: JWTTokenPayload): Promise<any> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
