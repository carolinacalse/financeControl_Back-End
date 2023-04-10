import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeAction1668078184158 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeActions",
        columns: [
          {
            name: "typeAction_id",
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
          name: "follow",
          type: "varchar",
          isNullable: true
        },
        {
          name: "type",
          type: "varchar",
          isNullable: true
        },
        {
          name: "responsible",
          type: "varchar",
          isNullable: true
        },
        {
          name: "email_adress",
          type: "varchar",
          isNullable: true
        },
        {
          name: "deadline",
          type: "timestamp",
          isNullable: true
        },
        {
          name: "status",
          type: "varchar",
          isNullable: true
        },
        {
          name: "action",
          type: "varchar",
          isNullable: true
        },
        {
          name: "comments",
          type: "varchar",
          isNullable: true
        },
        {
          name: "localization",
          type: "varchar",
          isNullable: true
        },
        {
          name: "id_rnc",
          type: "int",
          isNullable: true
        },
        {
          name: "externalAction",
          type: "varchar",
          isNullable: true
        },
        {
          name: "action_origin",
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
          name: "action_terminated ",
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
      await queryRunner.dropTable("financeControl_typeActions");
    }

}
