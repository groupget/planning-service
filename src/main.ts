import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const config = new ConfigService();
  const logger = new Logger("bootstrap");
  const port = config.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Service listening on port ${port}`);
}
bootstrap();
