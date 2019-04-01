import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Item } from '../models/item.model';
import { NewItemInput } from '../dto/new-item.input';
import { ProducerService } from '../../notifications/producer/producer.service';
import { NotificationEventType } from '../../notifications/models';

@Injectable()
export class ItemsService {

    constructor(
        @InjectModel(Item.modelName) private readonly itemModel: ModelType<Item>,
        private readonly notifier: ProducerService) { }

    public async getItems(listId: string) {
        return await this.itemModel.find({ listId: listId }).exec();
    }

    public async addNewItem(listId: string, item: NewItemInput) {
        const itemModel = new this.itemModel(item);
        const savedItem = await itemModel.save();
        await this.notifyQueue("created", savedItem);

        return savedItem;
    }

    public async toggleItem(itemId: string, isChecked: boolean) {
        const returnUpdatedObject = { new: true };
        return await this.itemModel.findByIdAndUpdate(itemId, { $set: { isChecked: isChecked } }, returnUpdatedObject);
    }

    public async removeItem(itemId: string) {
        return await this.itemModel.findByIdAndDelete(itemId);
    }

    private async notifyQueue(action: NotificationEventType, message: Item) {
        return await this.notifier.publish({
            resourceType: "item",
            type: action,
            message: message
        });
    }
}
