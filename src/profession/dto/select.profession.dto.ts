import { ApiProperty } from '@nestjs/swagger';

export class GetUserProfessionDto {
  @ApiProperty({ type: [String] })
  competencies_id: string[];
  @ApiProperty({ type: Number })
  salary: number;
}

export class SelectUserProfessionDto {
  @ApiProperty({ type: String })
  profession_id: string;
}
