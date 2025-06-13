// src/step-response/step-response.module.ts

import { Module } from '@nestjs/common';
import { StepResponseService } from './step-response.service';
import { StepResponseResolver } from './step-response.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [StepResponseService, StepResponseResolver, PrismaService],
  exports: [StepResponseService],
})
export class StepResponseModule {}
