import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRespondentInput } from './dto/create-respondent.input';

@Injectable()
export class RespondentService {
  constructor(private prisma: PrismaService) {}

async create(input: CreateRespondentInput) {
  const { name } = input;

  const existing = await this.prisma.respondent.findUnique({
    where: { name },
  });

  if (existing) {
    throw new BadRequestException(`You already answered this questionnaire`);
  }

  return this.prisma.respondent.create({
    data: { name },
  });
}


  findAll() {
    return this.prisma.respondent.findMany({ include: { stepresponse: true } });
  }

  findOne(id: number) {
    return this.prisma.respondent.findUnique({
      where: { id },
      include: { stepresponse: true },
    });
  }
}
