import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StepResponse } from './model/step-response.model';
import { StepResponseInput } from './dto/create-step-response.input';
import { StepResponseService } from './step-response.service';

@Resolver(() => StepResponse)
export class StepResponseResolver {
  constructor(private readonly service: StepResponseService) {}

  @Mutation(() => StepResponse)
  createStepResponse(@Args('input') input: StepResponseInput) {
    return this.service.create(input);
  }

    @Mutation(() => Boolean)
  async submitAllStepResponses(
    @Args('responses', { type: () => [StepResponseInput] }) responses: StepResponseInput[],
  ) {
    await this.service.submitAll(responses);
    return true;
  }

}
