import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { PlanningModule } from './planning/planning.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose-config.service';

@Module({
  imports: [
    ConfigModule,
    PlanningModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
