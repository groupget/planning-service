import { List } from "../models/list.model";
import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { NewItemInput } from "../dto/new-item.input";
import { Item } from "../models/item.model";
import { ItemsService } from "./items.service";
import { Inject } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PubSubToken } from "../../common/provide-tokens";
import { IUserInfo, UserInfo } from "../../common/decorators/user-decorator";

@Resolver(of => Item)
export class ItemsResolver {
    constructor(
        private readonly itemsService: ItemsService,
        @Inject(PubSubToken) private readonly pubSub: PubSub
    ) { }

    @Query(returns => [Item])
    async getItems(@Args('listId') listId: string) {
        return await this.itemsService.getItems(listId);
    }

    @Mutation(returns => Item)
    async addItem(@UserInfo() user: IUserInfo, @Args("newItemData") inputItem: NewItemInput) {
        const item = await this.itemsService.addNewItem(inputItem, user);
        await this.pubSub.publish('itemAdded', { itemAdded: item });

        return item;
    }

    @Mutation(returns => Item)
    async toggleItem(@Args('itemId') itemId: string, @Args('isChecked') checked: boolean) {
        const item = await this.itemsService.toggleItem(itemId, checked);
        await this.pubSub.publish('itemToggled', { itemToggled: item });
        return item;
    }

    @Mutation(returns => Item)
    async removeItem(@UserInfo() user: IUserInfo, @Args("itemId") itemId: string) {
        const item = await this.itemsService.removeItem(itemId, user);
        await this.pubSub.publish('itemRemoved', { itemRemoved: item });
        return item;
    }

    @Subscription(returns => Item)
    itemAdded() {
        return this.pubSub.asyncIterator('itemAdded');
    }

    @Subscription(returns => Item)
    itemToggled() {
        return this.pubSub.asyncIterator('itemToggled');
    }

    @Subscription(returns => Item)
    itemRemoved() {
        return this.pubSub.asyncIterator('itemRemoved');
    }
}
