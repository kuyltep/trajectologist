import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStepDto } from './dto/update.step.dto';
import { Profession, UserStep } from '@prisma/client';
import { SelectUserProfessionDto } from 'src/profession/dto/select.profession.dto';

@Injectable()
export class StepService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserSteps(id: string): Promise<UserStep[]> {
    try {
      return await this.prismaService.userStep.findMany({
        where: {
          user_competency: {
            user_id: id,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateUserStep(updateUserStep: UpdateStepDto): Promise<UserStep> {
    try {
      return await this.prismaService.userStep.update({
        where: {
          id: updateUserStep.id,
        },
        data: {
          is_completed: updateUserStep.is_comleted,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getStepsForCompetency(id: string): Promise<UserStep[]> {
    try {
      return await this.prismaService.userStep.findMany({
        where: {
          user_competency_id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
