import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointmente1660570106053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table ({
          name: "financeControl_appointments",
          columns: [
            {
              name: "id",
              type: "int",
              isGenerated: true,
              isPrimary: true,
              generationStrategy: "increment"
          },
            {
              name: "docNum",
              type: "int",
              isNullable: true
            },
            {
              name: "status",
              type: "varchar",
              isNullable: true
            },
            {
              name: "op",
              type: "varchar",
              isNullable: true
            },
            {
              name: "nota",
              type: "varchar",
              isNullable: true
            },
            {
              name: "bch",
              type: "varchar",
              isNullable: true
            },
            {
              name: "feedstock",
              type: "varchar",
              isNullable: true
            },
            {
              name: "partNumber",
              type: "varchar",
              isNullable: true
            },
            {
              name: "client",
              type: "varchar",
              isNullable: true
            },
            {
              name: "address",
              type: "varchar",
              isNullable: true
            },
            {
              name: "descriptionInspection",
              type: "varchar",
              isNullable: true
            },
            {
              name: "firstInspection",
              type: "varchar",
              isNullable: true
            },
            {
              name: "quantityTotal",
              type: "varchar",
              isNullable: true
            },
            {
              name: "quantityApproved",
              type: "varchar",
              isNullable: true
            },
            {
              name: "quantityRejected",
              type: "varchar",
              isNullable: true
            },
            {
              name: "provider",
              type: "varchar",
              isNullable: true
            },
            {
              name: "inactive",
              type: "varchar",
              default: "'N'",
              isNullable: true
            },
            {
              name: "create_user",
              type: "varchar",
              isNullable: true
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
              isNullable: true
            },
            {
              name: "cancel",
              type: "varchar",
              default: "'N'",
              isNullable: true
            },
            {
              name: "cancel_date",
              type: "timestamp",
              isNullable: true
            },
            {
              name: "cancel_user",
              type: "varchar",
              isNullable: true
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("financeControl_appointments");
    }

}
