import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { List } from '../models/list.model';
import { NewListInput } from '../dto/new-list.input';

@Injectable()
export class ListsService {

    constructor(@InjectModel(List.modelName) private readonly listModel: ModelType<List>) { }

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
        return await model.save();
    }

    public async removeList(id: string) {
        return await this.listModel.findByIdAndDelete(id);
    }
}
