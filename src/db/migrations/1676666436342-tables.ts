import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1676666436342 implements MigrationInterface {
    name = 'tables1676666436342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "qwer" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "qwer"`);
    }

}
