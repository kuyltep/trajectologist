import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCompetencyDto {
  @ApiProperty({ type: Boolean })
  is_completed: boolean;
}
