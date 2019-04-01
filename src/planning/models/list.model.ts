import { prop, ModelType, plugin, Typegoose } from "typegoose";
import { timestampPlugin } from "../../common/mongoose/mongoose-plugins";
import { Field, ObjectType, ID } from 'type-graphql';
import { ITimestamped } from "../../common/mongoose/timestamped-document";
import { schemaOptions } from "../../common/mongoose/schema.options";

export interface IList extends ITimestamped {
    id?: string;
    title: string;
    description?: string;
    groupId: string;
}


@ObjectType()
@plugin(timestampPlugin)
export class List extends Typegoose implements IList {
    @Field(type => ID)
    id: string; // mongoose virtual property

    @Field()
    @prop()
    title: string;

    @Field({ nullable: true })
    @prop()
    description: string;

    @Field()
    @prop()
    groupId: string;

    @Field() @prop() createdAt: Date;
    @Field() @prop() updatedAt: Date;

    public static get model(): ModelType<List> {
        return new List().getModelForClass(List, { schemaOptions });
    }

    public static get modelName(): string {
        return "List";
    }
}
