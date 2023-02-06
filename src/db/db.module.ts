import { Module } from '@nestjs/common';
import { dbProvider } from './db';

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
