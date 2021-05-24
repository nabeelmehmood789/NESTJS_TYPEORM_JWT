import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as config from "config";

console.log(config.get("jwt"));
export const typeOrmConfig : TypeOrmModuleOptions = {
    type: "mysql",
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/../**/*.migration.{js,ts}'],
    cli: {
        migrationsDir: 'src/db/migrations',
    },
    migrationsTableName: "migrations_typeorm",
}