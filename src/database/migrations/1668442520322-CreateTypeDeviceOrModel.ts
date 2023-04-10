import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeDeviceOrModel1668442520322 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeDeviceOrModels",
        columns: [
          {
            name: "typeDeviceOrModel_id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment"
        },
        {
          name: "item",
          type: "varchar",
          isNullable: true
        },
        {
          name: "device_id",
          type: "int",
          isNullable: true
        },
        {
          name: "model_id",
          type: "int",
          isNullable: true
        },
        {
          name: "inactive",
          type: "varchar",
          default: "'N'",
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
          default: "now()",
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
    await queryRunner.dropTable("financeControl_typeDeviceOrModels");
  }

}


