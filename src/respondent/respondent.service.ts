import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRespondentInput } from './dto/create-respondent.input';

@Injectable()
export class RespondentService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateRespondentInput) {
    // Step 1: Check if name already exists
    const existing = await this.prisma.respondent.findUnique({
      where: { name: input.name },
    });

    if (existing) {
      throw new BadRequestException(`You already answered this questionaire`);
    }

    // Step 2: Create respondent
    return this.prisma.respondent.create({ data: input });
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
