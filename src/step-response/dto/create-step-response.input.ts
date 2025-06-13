import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class StepResponseInput {
  @Field(() => Int)
  step: number;

  @Field()
  question: string;

  @Field()
  answer: string;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => Int)
  respondentId: number;
}
