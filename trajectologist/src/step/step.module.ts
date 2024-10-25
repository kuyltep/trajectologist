import { Module } from '@nestjs/common';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StepController],
  providers: [StepService, PrismaService],
})
export class StepModule {}
