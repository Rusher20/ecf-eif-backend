import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StepResponseInput } from './dto/create-step-response.input';

@Injectable()
export class StepResponseService {
  constructor(private prisma: PrismaService) {}

  async create(input: StepResponseInput) {
    // Step 1: Check if a response already exists for this respondent and step
    const existingResponse = await this.prisma.stepresponse.findFirst({
      where: {
        respondentId: input.respondentId,
        step: input.step,
      },
    });

    if (existingResponse) {
      throw new BadRequestException(
        `Respondent has already submitted a response for step ${input.step}.`
      );
    }

    // Step 2: Create new step response
    return this.prisma.stepresponse.create({
      data: {
        step: input.step,
        question: input.question,
        answer: input.answer,
        comment: input.comment,
        respondentId: input.respondentId,
      },
      include: {
        respondent: true,
      },
    });
  }


   async submitAll(inputs: StepResponseInput[]) {
    if (!inputs.length) {
      throw new BadRequestException('No responses provided.');
    }

    const respondentId = inputs[0].respondentId;

    // Ensure all inputs are for the same respondent
    const invalidRespondent = inputs.some(r => r.respondentId !== respondentId);
    if (invalidRespondent) {
      throw new BadRequestException('All responses must be for the same respondent.');
    }

    // Check for duplicates in the DB
    const existing = await this.prisma.stepresponse.findMany({
      where: {
        respondentId,
        step: { in: inputs.map(r => r.step) },
      },
    });

    if (existing.length > 0) {
      throw new BadRequestException('Some step responses already exist for this respondent.');
    }

    await this.prisma.stepresponse.createMany({
      data: inputs.map(({ step, question, answer, comment, respondentId }) => ({
        step,
        question,
        answer,
        comment,
        respondentId,
      })),
    });
  }
}
