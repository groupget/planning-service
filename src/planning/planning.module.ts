import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanningListSchema } from './schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PlanningList', schema: PlanningListSchema }]),
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule { }
