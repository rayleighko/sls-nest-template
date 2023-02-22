import { MigrationInterface, QueryRunner } from "typeorm";

import { UserTable } from "~/modules/core/user/constant/typeorm";
import { createTableSafe } from "~/utils/typeorm";

export class migration1670921199419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    
      CREATE OR REPLACE FUNCTION generate_ulid() RETURNS uuid
          AS $$
              SELECT (lpad(to_hex(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint), 12, '0') || encode(gen_random_bytes(10), 'hex'))::uuid;
          $$ LANGUAGE SQL;
    `);
    await createTableSafe(queryRunner, UserTable); // user
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(UserTable, true); // user
  }
}
