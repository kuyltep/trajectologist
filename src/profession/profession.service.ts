import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetUserProfessionDto,
  SelectUserProfessionDto,
} from './dto/select.profession.dto';
import { Profession } from '@prisma/client';

@Injectable()
export class ProfessionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfessionsForUser(
    selectProfessionDto: GetUserProfessionDto,
  ): Promise<Profession[]> {
    try {
      return await this.prismaService.profession.findMany({
        where: {
          salary: {
            gte: selectProfessionDto.salary,
          },
          competencies: {
            some: {
              id: {
                in: selectProfessionDto.competencies_id,
              },
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async selectProfession(
    selectProfessionDto: SelectUserProfessionDto,
    userId: string,
  ): Promise<Profession> {
    try {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          profession_id: selectProfessionDto.profession_id,
        },
      });

      const competencies = await this.prismaService.competency.findMany({
        where: {
          professions: {
            some: {
              id: selectProfessionDto.profession_id,
            },
          },
        },
      });

      const competenciesIds = competencies.map((competency) => competency.id);

      const steps = await this.prismaService.step.findMany({
        where: {
          competency_id: {
            in: competenciesIds,
          },
        },
      });

      const userComptenciesPromises = competencies.map(async (competency) => {
        const stepsForComepetency = steps.filter(
          (step) => step.competency_id === competency.id,
        );
        const userCompetency = await this.prismaService.userCompetency.create({
          data: {
            user_id: userId,
            competency_id: competency.id,
          },
        });
        const promisesData = stepsForComepetency.map(async (step) => {
          await this.prismaService.userStep.create({
            data: {
              step_id: step.id,
              user_competency_id: userCompetency.id,
            },
          });
        });
        await Promise.all(promisesData);
      });

      await Promise.all(userComptenciesPromises);

      return await this.prismaService.profession.findUnique({
        where: {
          id: selectProfessionDto.profession_id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUserProfession(id: string) {
    try {
      await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          profession_id: null,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
