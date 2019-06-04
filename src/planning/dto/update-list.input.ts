import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class UpdateListInput {

    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    @MaxLength(30)
    title?: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(0, 255)
    description?: string;
}
