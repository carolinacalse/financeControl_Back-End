import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCriterion1666788097213 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_criterions",
        columns: [
          {
            name: "criterion_id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment"
        },
          {
            name: "typeCriterion_id",
            type: "int",
            isNullable: true
          },
          {
            name: "typeResolution_id",
            type: "int",
            isNullable: true
          },
          {
            name: "typeRangeUse_id",
            type: "int",
            isNullable: true
          },
          {
            name: "id_instrument",
            type: "int",
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
    await queryRunner.dropTable("financeControl_criterions");
  }

}

