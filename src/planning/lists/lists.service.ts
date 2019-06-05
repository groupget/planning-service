import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { List } from '../models/list.model';
import { NewListInput } from '../dto/new-list.input';
import { UpdateListInput } from '../dto/update-list.input';
import { ProducerService } from '../../notifications/producer/producer.service';
import { NotificationEventType } from '../../notifications/models';
import { IUserInfo, UserInfo } from '../../common/decorators/user-decorator';

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

    public async createList(listDto: NewListInput, user?: IUserInfo) {
        const model = new this.listModel(listDto);
        const savedList = await model.save();
        await this.notifyQueue("created", savedList, user);
        return savedList;
    }

    public async updateList(updatedList: UpdateListInput, user?: IUserInfo) {
        const list = await this.listModel.findById(updatedList.id);

        if (updatedList.title) {
            list.title = updatedList.title;
        }

        if (updatedList.description) {
            list.description = updatedList.description;
        }
        const savedList = await list.save();
        await this.notifyQueue("updated", savedList, user);
        return savedList;
    }

    public async removeList(id: string, user?: IUserInfo) {
        const result = await this.listModel.findByIdAndDelete(id);

        if (result !== null) {
            await this.notifyQueue("deleted", result, user);
        }

        return result;
    }

    private async notifyQueue(action: NotificationEventType, message: List, user: IUserInfo) {
        return await this.notifier.publish({
            resourceType: "list",
            type: action,
            message: message,
            userDetails: user
        });
    }
}
