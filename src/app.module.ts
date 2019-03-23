import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './config/config.module';
import { PlanningModule } from './planning/planning.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose-config.service';

@Module({
  imports: [
    ConfigModule,
    PlanningModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [],
})
export class AppModule { }
