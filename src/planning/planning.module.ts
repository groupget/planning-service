import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanningService } from './planning.service';
import { List } from './models/list.model';
import { Item } from './models/item.model';
import { ListsService } from './lists/lists.service';
import { ItemsService } from './items/items.service';
import { ItemsResolver } from './items/items.resolver';
import { ListsResolver } from './lists/lists.resolver';
import { PubSubProvider } from './providers/pub-sub.provider';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: List.modelName, schema: List.model.schema },
      { name: Item.modelName, schema: Item.model.schema }
    ]),
  ],
  providers: [
    PlanningService,
    ListsResolver,
    ItemsResolver,
    ItemsService,
    ListsService,
    PubSubProvider,
  ],
})
export class PlanningModule { }
