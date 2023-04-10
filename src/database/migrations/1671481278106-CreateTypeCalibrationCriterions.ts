import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeCalibrationCriterions1671481278106 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeCalibrationCriterion",
        columns: [
          {
            name: "typeCalibrationCriterion_id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment"
        },
          {
            name: "criterion_id",
            type: "int",
            isNullable: true
          },
          {
            name: "typeCalibration_id",
            type: "int",
            isNullable: true
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true
          },
          {
            name: "value",
            type: "varchar",
            isNullable: true
          },
          {
            name: "statusLine",
            type: "varchar",
            isNullable: true
          },
          {
            name: "uncertainty",
            type: "float",
            isNullable: true
          },
          {
            name: "error",
            type: "float",
            isNullable: true
          },
          {
            name: "amount",
            type: "float",
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
    await queryRunner.dropTable("financeControl_typeCalibrationCriterion");
  }

}


