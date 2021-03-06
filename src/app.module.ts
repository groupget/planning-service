import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './config/config.module';
import { PlanningModule } from './planning/planning.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongoose-config.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule,
    PlanningModule,
    NotificationsModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ headers: req.headers }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
      introspection: true
    }),
  ],
  providers: [],
})
export class AppModule { }
