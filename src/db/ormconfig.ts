import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/entities/*.entity.ts'],
  logging: true,
  synchronize: false,
  // synchronize: true,
  migrationsRun: true,
  migrations: ['src/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
