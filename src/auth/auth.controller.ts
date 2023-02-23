import { Controller } from '@nestjs/common';
import { Post, HttpCode, UseInterceptors } from '@nestjs/common/decorators';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { Public } from 'src/decorators/public';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() { login, password }: CreateUserDto) {
    return this.authService.validateUser(login, password);
  }
}
