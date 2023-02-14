import { ApiHideProperty } from '@nestjs/swagger/dist/decorators';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
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
