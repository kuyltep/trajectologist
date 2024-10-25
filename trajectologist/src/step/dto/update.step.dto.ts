import { ApiProperty } from '@nestjs/swagger';

export class UpdateStepDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: Boolean })
  is_comleted: boolean;
}
