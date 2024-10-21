import { Body, Controller, Delete, Post, Request } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ApiTags } from '@nestjs/swagger';
import {
  GetUserProfessionDto,
  SelectUserProfessionDto,
} from './dto/select.profession.dto';
import { Profession } from '@prisma/client';

@ApiTags('profession')
@Controller('professi1on')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Post('/user-profession')
  async getProfessionsForUser(
    @Body() selectProfessionDto: GetUserProfessionDto,
  ): Promise<Profession[]> {
    return this.professionService.getProfessionsForUser(selectProfessionDto);
  }

  @Post('/select')
  async selectProfession(
    @Body() selectProfessionDto: SelectUserProfessionDto,
    @Request() req,
  ): Promise<Profession> {
    return this.professionService.selectProfession(
      selectProfessionDto,
      req.user.id,
    );
  }

  @Delete('/user')
  async deleteUserProfession(@Request() req) {
    return this.professionService.deleteUserProfession(req.user.id);
  }
}
