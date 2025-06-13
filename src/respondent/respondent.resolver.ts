import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RespondentService } from './respondent.service';
import { Respondent } from './model/respondent.model';
import { CreateRespondentInput } from './dto/create-respondent.input';

@Resolver(() => Respondent)
export class RespondentResolver {
  constructor(private readonly respondentService: RespondentService) {}

  @Mutation(() => Respondent)
  createRespondent(@Args('input') input: CreateRespondentInput) {
    return this.respondentService.create(input);
  }

  @Query(() => [Respondent])
  respondents() {
    return this.respondentService.findAll();
  }

  @Query(() => Respondent, { nullable: true })
  respondent(@Args('id', { type: () => Int }) id: number) {
    return this.respondentService.findOne(id);
  }
}
