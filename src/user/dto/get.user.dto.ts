import { ApiProperty } from '@nestjs/swagger';

export class GetShortCompetencyDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: Number })
  @ApiProperty({ type: Date })
  created_at: Date;
  @ApiProperty({ type: Date })
  updated_at: Date;
}

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

export class GetShortProfessionDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: Number })
  salary: number;
  @ApiProperty({ type: Date })
  created_at: Date;
  @ApiProperty({ type: Date })
  updated_at: Date;
}

export class GetUserShortCompetencyDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: Date })
  created_at: Date;
  @ApiProperty({ type: Date })
  updated_at: Date;
  @ApiProperty({ type: String })
  competency_id: string;
  @ApiProperty({})
  competency: GetShortCompetencyDto;
  @ApiProperty({ type: String })
  user_id: string;
  @ApiProperty({ type: Boolean })
  is_completed: boolean;
}

export class GetAllUserDto extends GetShortUserDto {
  @ApiProperty({})
  profession: GetShortProfessionDto;
  @ApiProperty({})
  user_competencies: GetUserShortCompetencyDto[];
}
