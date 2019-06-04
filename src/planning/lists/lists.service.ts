import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { List } from '../models/list.model';
import { NewListInput } from '../dto/new-list.input';
import { ProducerService } from '../../../dist/notifications/producer/producer.service';
import { NotificationEventType } from '../../../dist/notifications/models';

@Injectable()
export class ListsService {

    constructor(
        @InjectModel(List.modelName) private readonly listModel: ModelType<List>
        , private readonly notifier: ProducerService
    ) { }

    public async getAllLists() {
        return await this.listModel.find({}).exec();
    }

    public async getListById(id: string) {
        return await this.listModel.findById(id);
    }

    public async getGroupLists(groupId: string) {
        return await this.listModel.find({ groupId }).exec();
    }

    public async createList(listDto: NewListInput) {
        const model = new this.listModel(listDto);
        const savedList = await model.save();
        await this.notifyQueue("created", savedList);
        return savedList;
    }

    public async removeList(id: string) {
        const result = await this.listModel.findByIdAndDelete(id);

        if (result !== null) {
            await this.notifyQueue("deleted", result);
        }

        return result;
    }

    private async notifyQueue(action: NotificationEventType, message: List) {
        return await this.notifier.publish({
            resourceType: "list",
            type: action,
            message: message
        });
    }
}
