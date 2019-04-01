import { List, IList } from "../models/list.model";
import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { PlanningService } from "../planning.service";
import { NewListInput } from "../dto/new-list.input";
import { NewItemInput } from "../dto/new-item.input";
import { Item } from "../models/item.model";
import { ItemsService } from "./items.service";
import { Inject } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PubSubToken } from "src/common/provide-tokens";

@Resolver(of => List)
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
    async addItem(@Args('listId') listId: string, @Args("newItemData") inputItem: NewItemInput) {
        const item = await this.itemsService.addNewItem(listId, inputItem);
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
    async removeItem(@Args('listId') listId: string, @Args("itemId") itemId: string) {
        const item = await this.itemsService.removeItem(itemId);
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
