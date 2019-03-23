import { List, IList } from "../models/list.model";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { PlanningService } from "../planning.service";
import { NewListInput } from "../dto/new-list.input";
import { NewItemInput } from "../dto/new-item.input";
import { Item } from "../models/item.model";
import { ItemsService } from "./items.service";

@Resolver(of => List)
export class ItemsResolver {
    constructor(private readonly itemsService: ItemsService) { }

    @Query(returns => [Item])
    async getItems(@Args('listId') listId: string) {
        return await this.itemsService.getItems(listId);
    }

    @Mutation(returns => Item)
    async addItem(@Args('listId') listId: string, @Args("newItemData") item: NewItemInput) {
        return await this.itemsService.addNewItem(listId, item);
    }

    @Mutation(returns => Item)
    async toggleItem(@Args('itemId') itemId: string, @Args('isChecked') checked: boolean) {
        return await this.itemsService.toggleItem(itemId, checked);
    }

    @Mutation(returns => Item)
    async removeItem(@Args('listId') listId: string, @Args("itemId") itemId: string) {
        return await this.itemsService.removeItem(itemId);
    }
}
