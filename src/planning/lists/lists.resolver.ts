import { List } from "../models/list.model";
import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { NewListInput } from "../dto/new-list.input";
import { ListsService } from "./lists.service";
import { NotFoundException, Inject } from "@nestjs/common";
import { UpdateListInput } from "../dto/update-list.input";
import { PubSub } from "graphql-subscriptions";
import { PubSubToken } from "../../common/provide-tokens";
import { UserInfo, IUserInfo } from "../../common/decorators/user-decorator";

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
    async addList(@UserInfo() user: IUserInfo, @Args('newListData') newListData: NewListInput) {
        const list = await this.listsService.createList(newListData, user);

        await this.pubSub.publish('listAdded', { listAdded: list });

        return list;
    }

    @Mutation(returns => List)
    async updateList(@UserInfo() user: IUserInfo, @Args('updatedList') updatedList: UpdateListInput) {
        const list = await this.listsService.updateList(updatedList, user);

        await this.pubSub.publish('listUpdated', { listUpdated: list });

        return list;
    }

    @Mutation(returns => List)
    async removeList(@UserInfo() user: IUserInfo, @Args('listId') listId: string) {
        const list = await this.listsService.removeList(listId, user);
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
