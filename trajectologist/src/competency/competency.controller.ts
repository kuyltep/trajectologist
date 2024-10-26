import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { CompetencyService } from './competency.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Competency, UserCompetency } from '@prisma/client';
import { UpdateUserCompetencyDto } from './dto/update.comptency.dto';

@ApiTags('comptency')
@Controller('competency')
export class CompetencyController {
  constructor(private readonly comptencyService: CompetencyService) {}

  @ApiBearerAuth('auth')
  @Get('/profession/:id')
  async getCompetenciesForProfession(@Request() req, @Param('id') id: string) {
    return this.comptencyService.getCompetenciesForProfession(
      req.user.user_id,
      id,
    );
  }

  @ApiBearerAuth('auth')
  @Get('/list')
  async getListCompetencies(): Promise<Competency[]> {
    return this.comptencyService.getListCompetencies();
  }

  @ApiBearerAuth('auth')
  @Get('/:id')
  async getCompetencyById(@Param('id') id: string) {
    return this.comptencyService.getCompetencyById(id);
  }

  @ApiBearerAuth('auth')
  @Patch('/update/:id')
  @ApiParam({ type: String, required: true, name: 'user competency id' })
  async updateUserCompetency(
    @Body() updateUserCompetencyDto: UpdateUserCompetencyDto,
    @Request() req,
    @Param('id') id: string,
  ): Promise<UserCompetency> {
    return this.comptencyService.updateUserCompetency(
      updateUserCompetencyDto,
      req.user.user_id,
      id,
    );
  }
}
