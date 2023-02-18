import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1676666367516 implements MigrationInterface {
    name = 'tables1676666367516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "work"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "work" boolean`);
    }

}
