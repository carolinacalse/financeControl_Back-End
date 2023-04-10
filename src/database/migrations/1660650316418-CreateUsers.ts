import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1660650316418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table ({
          name: "financeControl_users",
          columns: [
            {
              name: "id",
              type: "int",
              isGenerated: true,
              isPrimary: true,
              generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "driver_license",
            type: "varchar"
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("financeControl_users");
    }


}
