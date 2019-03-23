import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Item } from '../models/item.model';
import { NewItemInput } from '../dto/new-item.input';

@Injectable()
export class ItemsService {

    constructor(@InjectModel(Item.modelName) private readonly itemModel: ModelType<Item>) { }

    public async getItems(listId: string) {
        return await this.itemModel.find({ listId: listId }).exec();
    }

    public async addNewItem(listId: string, item: NewItemInput) {
        const itemModel = new this.itemModel(item);
        return await itemModel.save();
    }

    public async toggleItem(itemId: string, isChecked: boolean) {
        const returnUpdatedObject = { new: true };
        return await this.itemModel.findByIdAndUpdate(itemId, { $set: { isChecked: isChecked } }, returnUpdatedObject);
    }

    public async removeItem(itemId: string) {
        return await this.itemModel.findByIdAndDelete(itemId);
    }
}
