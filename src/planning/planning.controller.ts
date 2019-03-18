import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreatePlanningListDto } from './dto/CreatePlanningList';

@Controller('planning')
export class PlanningController {

    constructor(private readonly planningService: PlanningService) { }

    @Get()
    public async getAll() {
        return this.planningService.getAll();
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.planningService.getById(id);
    }

    @Post()
    async create(@Body() newList: CreatePlanningListDto) {
        return this.planningService.create(newList);
    }
}
