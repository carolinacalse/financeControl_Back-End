import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeImages1671187758565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table ({
            name: "financeControl_typeImages",
            columns: [
              {
                name: "typeImages_id",
                type: "int",
                isGenerated: true,
                isPrimary: true,
                generationStrategy: "increment"
            },
              {
                name: "image_name",
                type: "varchar",
                isNullable: true
              },
              {
                name: "image_url",
                type: "varchar",
                isNullable: true
              },
              {
                name: "typeDevice_id",
                type: "int",
                isNullable: true
              },
              {
                name: "typeModel_id",
                type: "int",
                isNullable: true
              },
              {
                name: "typeCalibration_id",
                type: "int",
                isNullable: true
              },
              {
                name: "typealert_id",
                type: "int",
                isNullable: true
              },
              {
                name: "id_instrument",
                type: "int",
                isNullable: true
              },
              {
                name: "id_appointment",
                type: "int",
                isNullable: true
              },
              {
                name: "id_action",
                type: "int",
                isNullable: true
              },
              {
                name: "selected",
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
        await queryRunner.dropTable("financeControl_typeImages");
      }

    }
