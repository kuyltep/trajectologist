import { ApiProperty } from '@nestjs/swagger';

export class UploadDataDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
