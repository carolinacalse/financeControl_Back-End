import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeCalibration1667391074684 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeCalibrations",
        columns: [
          {
            name: "typeCalibration_id",
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
          name: "dateCalibration",
          type: "varchar",
          isNullable: true
        },
        {
          name: "nextCalibration",
          type: "varchar",
          isNullable: true
        },
        {
          name: "finalReport",
          type: "varchar",
          isNullable: true
        },
        {
          name: "type",
          type: "varchar",
          isNullable: true
        },
        {
          name: "item",
          type: "varchar",
          isNullable: true
        },
        {
          name: "provider",
          type: "varchar",
          isNullable: true
        },
        {
          name: "note",
          type: "varchar",
          isNullable: true
        },
        {
          name: "status",
          type: "varchar",
          isNullable: true
        },
        {
          name: "id_model",
          type: "int",
          isNullable: true
        },
        {
          name: "id_instrument",
          type: "int",
          isNullable: true
        },
        {
          name: "id_device",
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
    await queryRunner.dropTable("financeControl_typeCalibrations");
  }

}

