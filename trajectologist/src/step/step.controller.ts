import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { StepService } from './step.service';
import { UpdateStepDto } from './dto/update.step.dto';
import { UserStep } from '@prisma/client';

@ApiTags('step')
@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @ApiBearerAuth('auth')
  @Get('/step/user')
  async getUserSteps(@Request() req): Promise<UserStep[]> {
    return this.stepService.getUserSteps(req.user.id);
  }

  @ApiBearerAuth('auth')
  @ApiBody({ type: UpdateStepDto })
  @Patch('/step/user')
  async updateUserStep(
    @Body() updateUserStep: UpdateStepDto,
  ): Promise<UserStep> {
    return this.stepService.updateUserStep(updateUserStep);
  }

  @ApiBearerAuth('auth')
  @Get('/step/competency/:id')
  @ApiParam({ type: String, name: 'competency-id', required: true })
  async getStepsForCompetency(
    @Request() req,
    @Param('id') id: string,
  ): Promise<UserStep[]> {
    return this.stepService.getStepsForCompetency(id);
  }
}
