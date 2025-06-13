
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StepResponse } from 'src/step-response/model/step-response.model';

@ObjectType()
export class Respondent {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [StepResponse])
  steps: StepResponse[];
}
