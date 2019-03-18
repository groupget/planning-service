import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class AppController {

  @Get("ping")
  ping(): number {
    const logger = new Logger("AppController");
    logger.debug("ping-pong");
    return new Date().getTime();
  }
}
