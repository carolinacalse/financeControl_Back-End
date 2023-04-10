import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNotConform1663004606480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table ({
          name: "financeControl_notConforms",
          columns: [
            {
              name: "notConform_id",
              type: "int",
              isGenerated: true,
              isPrimary: true,
              generationStrategy: "increment"
          },
            {
              name: "problemDescription",
              type: "varchar",
              isNullable: true
            },
            {
              name: "defectClassification",
              type: "varchar",
              isNullable: true
            },
            {
              name: "causativeProcess",
              type: "varchar",
              isNullable: true
            },
            {
              name: "defectType",
              type: "varchar",
              isNullable: true
            },
            {
              name: "detectedSpot",
              type: "varchar",
              isNullable: true
            },
            {
              name: "quantityDefect",
              type: "varchar",
              isNullable: true
            },
            {
              name: "indicator",
              type: "varchar",
              isNullable: true
            },
            {
              name: "program",
              type: "varchar",
              isNullable: true
            },
            {
              name: "responsibleOperator",
              type: "varchar",
              isNullable: true
            },
            {
              name: "shift",
              type: "varchar",
              isNullable: true
            },
            {
              name: "potentialCause",
              type: "varchar",
              isNullable: true
            },
            {
              name: "obsPotentialCause",
              type: "varchar",
              isNullable: true
            },
            {
              name: "actionAccept",
              type: "varchar",
              isNullable: true
            },
            {
              name: "actionRework",
              type: "varchar",
              isNullable: true
            },
            {
              name: "actionScrap",
              type: "varchar",
              isNullable: true
            },
            {
              name: "indicatorScrap",
              type: "varchar",
              isNullable: true
            },
            {
              name: "detour",
              type: "varchar",
              isNullable: true
            },
            {
              name: "note",
              type: "varchar",
              isNullable: true
            },
            {
              name: "scrapDate",
              type: "timestamp",
              isNullable: true
            },
            {
              name: "unitaryValue",
              type: "varchar",
              isNullable: true
            },
            {
              name: "amount",
              type: "varchar",
              isNullable: true
            },
            {
              name: "unitWeight",
              type: "varchar",
              isNullable: true
            },
            {
              name: "totalWeight",
              type: "varchar",
              isNullable: true
            },
            {
              name: "rncTerminated",
              type: "varchar",
              default: "'N'",
              isNullable: true
            },
            {
              name: "workInstruction",
              type: "varchar",
              isNullable: true
            },
            {
              name: "operatorFollowedInstruction",
              type: "varchar",
              isNullable: true
            },
            {
              name: "trainedOperator",
              type: "varchar",
              isNullable: true
            },
            {
              name: "machineProblem",
              type: "varchar",
              isNullable: true
            },
            {
              name: "tooling",
              type: "varchar",
              isNullable: true
            },
            {
              name: "inherentDefect",
              type: "varchar",
              isNullable: true
            },
            {
              name: "disposition",
              type: "varchar",
              isNullable: true
            },
            {
              name: "id_file",
              type: "int",
              isNullable: true
            },
            {
              name: "appointmente_id",
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
              name: "create_user",
              type: "varchar",
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
      await queryRunner.dropTable("financeControl_notConforms");
    }

}
