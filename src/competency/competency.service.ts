import { BadRequestException, Injectable } from '@nestjs/common';
import { Competency, UserCompetency } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserCompetencyDto } from './dto/update.comptency.dto';

@Injectable()
export class CompetencyService {
  constructor(private readonly prismaService: PrismaService) {}
  async getCompetenciesForProfession(id: string) {
    try {
      return await this.prismaService.userCompetency.findMany({
        where: {
          user_id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUserCompetency(
    updateUserCompetencyDto: UpdateUserCompetencyDto,
    userId: string,
    id: string,
  ): Promise<UserCompetency> {
    try {
      return await this.prismaService.userCompetency.update({
        where: {
          id,
          user_id: userId,
        },
        data: {
          is_completed: updateUserCompetencyDto.is_completed,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getListCompetencies(): Promise<Competency[]> {
    try {
      return await this.prismaService.competency.findMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
