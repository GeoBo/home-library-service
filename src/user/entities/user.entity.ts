import { ApiHideProperty } from '@nestjs/swagger/dist/decorators';
import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  @ApiHideProperty()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(user: User) {
    Object.assign(this, user);
  }
}
