import { ApiHideProperty } from '@nestjs/swagger/dist/decorators';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password: string;

  @VersionColumn()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;
}
