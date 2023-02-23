import { ApiTags } from '@nestjs/swagger/dist';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode, UseInterceptors } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger/dist/decorators';
import { User } from './entities/user.entity';
import { Public } from 'src/decorators/public';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
