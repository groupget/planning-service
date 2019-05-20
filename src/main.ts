import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import bodyParser = require('body-parser');
import { reqLogger } from './common/middlewares/request-logger.middleware';

async function bootstrap() {
  const config = new ConfigService();
  const logger = new Logger("bootstrap");
  const port = config.port;

  const app = await NestFactory.create(AppModule);

  app.use(bodyParser());
  app.use(reqLogger());

  await app.listen(port);

  logger.log(`Service listening on port ${port}`);
}
bootstrap();
