import { prop, ModelType, plugin, Typegoose } from "typegoose";
import { timestampPlugin } from "../../common/mongoose/mongoose-plugins";
import { Field, ObjectType, ID } from 'type-graphql';
import { ITimestamped } from "../../common/mongoose/timestamped-document";
import { schemaOptions } from "../../common/mongoose/schema.options";

export interface IItem extends ITimestamped {
    id: string;
    listId: string;
    groupId: string;
    description: string;
    isChecked: boolean;
}

@ObjectType()
@plugin(timestampPlugin)
export class Item extends Typegoose implements IItem {

    @Field(type => ID)
    id: string;

    @Field(type => ID)
    @prop()
    listId: string;

    @Field(type => ID)
    @prop()
    groupId: string;

    @Field()
    @prop()
    description: string;

    @Field()
    @prop({ default: false })
    isChecked: boolean;

    @Field() @prop() createdAt: Date;
    @Field() @prop() updatedAt: Date;

    public static get model(): ModelType<Item> {
        return new Item().getModelForClass(Item, { schemaOptions });
    }

    public static get modelName(): string {
        return "Item";
    }
}
