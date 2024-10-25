import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  GetUserProfessionDto,
  SelectUserProfessionDto,
} from './dto/select.profession.dto';
import { Profession } from '@prisma/client';

@ApiTags('profession')
@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @ApiBearerAuth('auth')
  @Post('/user-profession')
  async getProfessionsForUser(
    @Body() selectProfessionDto: GetUserProfessionDto,
    @Req() req,
  ): Promise<Profession[]> {
    return this.professionService.getProfessionsForUser(
      selectProfessionDto,
      req.user.user_id,
    );
  }

  @ApiBearerAuth('auth')
  @Post('/select')
  async selectProfession(
    @Body() selectProfessionDto: SelectUserProfessionDto,
    @Request() req,
  ): Promise<Profession> {
    return this.professionService.selectProfession(
      selectProfessionDto,
      req.user.user_id,
    );
  }

  @ApiBearerAuth('auth')
  @Get('/:id')
  async getAllProfessionInfoById(@Param('id') id: string) {
    return this.professionService.getAllProfessionInfoById(id);
  }

  @ApiBearerAuth('auth')
  @Delete('/user')
  async deleteUserProfession(@Request() req) {
    return this.professionService.deleteUserProfession(req.user.user_id);
  }
}
