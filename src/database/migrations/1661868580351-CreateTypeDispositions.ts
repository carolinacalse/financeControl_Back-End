import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateTypeDispositions1661868580351 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeDispositions",
        columns: [
          {
            name: "typeDisposition_id",
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
          name: "description",
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
      await queryRunner.dropTable("financeControl_typeDispositions");
    }

}
