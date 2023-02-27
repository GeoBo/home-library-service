import { TokenModule } from 'src/lib/token/token.module';
import { UserModule } from './../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtAuthGuard, JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule,
    TokenModule,
  ],
})
export class AuthModule {}
