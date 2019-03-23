import { List } from "../models/list.model";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { NewListInput } from "../dto/new-list.input";
import { ListsService } from "./lists.service";

@Resolver(of => List)
export class ListsResolver {

    constructor(private readonly listsService: ListsService) { }

    @Query(returns => [List])
    async allLists() {
        return await this.listsService.getAllLists();
    }
    @Query(returns => List)
    async list(@Args('listId') listId: string) {
        return await this.listsService.getListById(listId);
    }

    @Query(returns => [List])
    async groupLists(@Args('groupId') groupId: string) {
        return await this.listsService.getGroupLists(groupId);
    }

    @Mutation(returns => List)
    async addList(@Args('newListData') newListData: NewListInput) {
        const list = await this.listsService.createList(newListData);
        // pubSub.publish('recipeAdded', { recipeAdded: list });
        return list;
    }

    @Mutation(returns => List)
    async removeList(@Args('listId') listId: string) {
        const list = await this.listsService.removeList(listId);
        // pubSub.publish('recipeAdded', { recipeAdded: list });
        return list;
    }
}
