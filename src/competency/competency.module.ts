import { Module } from '@nestjs/common';
import { CompetencyController } from './competency.controller';
import { CompetencyService } from './competency.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompetencyController],
  providers: [CompetencyService, PrismaService],
})
export class CompetencyModule {}
