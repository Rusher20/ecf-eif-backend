import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRespondentInput {
  @Field()
  name: string;
}