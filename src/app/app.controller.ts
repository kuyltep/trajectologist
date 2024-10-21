import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import updateData from 'src/excel/updateData';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDataDto } from './dto/upload.data.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @ApiBearerAuth('auth')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: UploadDataDto })
  @Post('/update')
  async updateData(@UploadedFile() file: Express.Multer.File) {
    return updateData();
  }
}
