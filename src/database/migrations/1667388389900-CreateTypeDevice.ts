import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeDevice1667388389900 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: "financeControl_typeDevices",
        columns: [
          {
            name: "typeDevice_id",
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
          name: "developed",
          type: "varchar",
          isNullable: true
        },
        {
          name: "location",
          type: "varchar",
          isNullable: true
        },
        {
          name: "responsible",
          type: "varchar",
          isNullable: true
        },
        {
          name: "frequency",
          type: "varchar",
          isNullable: true
        },
        {
          name: "customer",
          type: "varchar",
          isNullable: true
        },
        {
          name: "status",
          type: "varchar",
          isNullable: true
        },
        {
          name: "criterion",
          type: "varchar",
          isNullable: true
        },
        {
          name: "note",
          type: "varchar",
          isNullable: true
        },
        {
          name: "positionID",
          type: "int",
          isNullable: true
        },
        {
          name: "positionDescription",
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
    await queryRunner.dropTable("financeControl_typeDevices");
  }

}

