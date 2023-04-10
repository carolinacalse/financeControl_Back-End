import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProcessAlert1677860366845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: "financeControl_process_alert",
                columns: [
                    {
                        name: "process_alert_id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "typeAlert_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "process",
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
        await queryRunner.dropTable("financeControl_process_alert");
    }

}
