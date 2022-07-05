import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    readonly email: string;
    @Field()
    @IsNotEmpty()
    readonly password: string;
}
