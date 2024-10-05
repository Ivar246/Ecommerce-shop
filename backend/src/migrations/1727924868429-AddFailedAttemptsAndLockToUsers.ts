import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFailedAttemptsAndLockToUsers1727924868429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD failed_attempts INT DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE users ADD is_locked BOOLEAN DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN failed_attempts`);
        await queryRunner.query(`ALTER TABLE users DROP COLUMN is_locked`);
    }
}
