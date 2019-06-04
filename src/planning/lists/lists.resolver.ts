import { List } from "../models/list.model";
import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { NewListInput } from "../dto/new-list.input";
import { ListsService } from "./lists.service";
import { NotFoundException, Inject } from "@nestjs/common";
import { UpdateListInput } from "../dto/update-list.input";
import { PubSubToken } from "../../../dist/common/provide-tokens";
import { PubSub } from "graphql-subscriptions";

@Resolver(of => List)
export class ListsResolver {

    constructor(
        private readonly listsService: ListsService
        , @Inject(PubSubToken) private readonly pubSub: PubSub
    ) { }

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
        
        await this.pubSub.publish('listAdded', { listAdded: list });
        
        return list;
    }

    @Mutation(returns => List)
    async updateList(@Args('updatedList') updatedList: UpdateListInput) {
        const list = await this.listsService.updateList(updatedList);
        
        await this.pubSub.publish('listUpdated', { listUpdated: list });
        
        return list;
    }

    @Mutation(returns => List)
    async removeList(@Args('listId') listId: string) {
        const list = await this.listsService.removeList(listId);
        if (!list) {
            throw new NotFoundException();
        }
        
        await this.pubSub.publish('listDeleted', { listDeleted: list });
        
        return list;
    }

    @Subscription(returns => List)
    listAdded() {
        return this.pubSub.asyncIterator('listAdded');
    }

    @Subscription(returns => List)
    listUpdated() {
        return this.pubSub.asyncIterator('listUpdated');
    }

    @Subscription(returns => List)
    listRemoved() {
        return this.pubSub.asyncIterator('listRemoved');
    }
}
