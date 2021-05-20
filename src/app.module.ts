import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      ConfigModule.forRoot({ isGlobal: true }),
      TasksModule,
      AuthModule,
      PostModule
  ],
})
export class AppModule {}
