import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlanningListDocument } from './interfaces/list';
import { Model } from 'mongoose';
import { CreatePlanningListDto } from './dto/CreatePlanningList';

@Injectable()
export class PlanningService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(@InjectModel("PlanningList") private readonly listModel: Model<PlanningListDocument>) { }

    public async getAll() {
        return await this.listModel.find({}).exec();
    }

    public async getById(id: string) {
        return await this.listModel.findById(id);
    }

    public async create(listDto: CreatePlanningListDto) {
        //
        const model = new this.listModel(listDto);
        return await model.save();
    }
}
