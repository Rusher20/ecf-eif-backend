import { Module } from '@nestjs/common';
import { RespondentService } from './respondent.service';
import { RespondentResolver } from './respondent.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [RespondentResolver, RespondentService, PrismaService],
})
export class RespondentModule {}