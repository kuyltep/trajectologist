import { ApiProperty } from '@nestjs/swagger';

export class GetShortUserDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  first_name: string;
  @ApiProperty({ type: String })
  last_name: string;
  @ApiProperty({ type: String })
  login: string;
  @ApiProperty({ type: String })
  password: string;
  @ApiProperty({ type: Date })
  birthday: Date;
  @ApiProperty({ type: Date })
  created_at: Date;
  @ApiProperty({ type: Date })
  updated_at: Date;
  @ApiProperty({ type: String })
  profession_id: string;
}
