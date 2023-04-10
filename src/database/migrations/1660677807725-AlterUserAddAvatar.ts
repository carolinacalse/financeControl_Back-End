import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddAvatar1660677807725 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "financeControl_users",
        new TableColumn({
          name:"avatar",
           type:"varchar",
           isNullable: true,
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("financeControl_users", "avatar");
    }

}
