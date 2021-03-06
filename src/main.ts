import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';
import * as config from "config";

async function bootstrap() {

  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get("server");
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port 3000`);
}
bootstrap();
