import { Module } from '@nestjs/common';
import { ProfessionController } from './profession.controller';
import { ProfessionService } from './profession.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProfessionController],
  providers: [ProfessionService, PrismaService],
})
export class ProfessionModule {}
