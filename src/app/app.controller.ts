import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import updateData from 'src/excel/updateData';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiBearerAuth('auth')
  @Post('/update')
  async updateData() {
    return updateData();
  }
}
