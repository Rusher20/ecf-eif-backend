import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Respondent } from 'src/respondent/model/respondent.model';

@ObjectType()
export class StepResponse {
  @Field(() => Int)
  id: number;

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

  @Field(() => Respondent, { nullable: true })
  respondent?: Respondent;

  @Field()
  createdAt: Date;
}
