import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { MongooseConfigService } from './mongoose-config.service';

@Global()
@Module({
  providers: [ConfigService, MongooseConfigService],
  exports: [ConfigService]
})
export class ConfigModule { }
