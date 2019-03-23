import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NewListInput {
    @Field()
    @MaxLength(30)
    title: string;

    @Field()
    groupId: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(0, 255)
    description?: string;
}
