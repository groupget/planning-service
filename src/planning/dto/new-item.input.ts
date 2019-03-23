import { Length } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class NewItemInput {
    @Field()
    @Length(0, 255)
    description: string;

    @Field(type => ID)
    listId: string;

    @Field(type => ID)
    groupId: string;
}
