import { ApiHideProperty } from '@nestjs/swagger/dist/decorators';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
  VersionColumn,
} from 'typeorm';

export const bigint: ValueTransformer = {
  to: (entityValue: number) => entityValue.toString(),
  from: (databaseValue: string): number => parseInt(databaseValue, 10),
};

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  //@Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  password: string;

  @VersionColumn()
  version: number;

  @Column('bigint', { transformer: [bigint] })
  createdAt: number;

  @Column('bigint', { transformer: [bigint] })
  updatedAt: number;
}
