import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPost1621494762186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"posts",
            columns: [
                {
                    name:"id",
                    type:"int",
                    isPrimary:true,
                    isGenerated:true,
                    isUnique:true
                },
                {
                    name:"title",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"description",
                    type:"text",
                    isNullable:false
                },
                {
                    name:"created_at",
                    type:"datetime",
                    isNullable:false
                },
                {
                    name:"updated_at",
                    type:"datetime",
                    isNullable:false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts");
    }

}
