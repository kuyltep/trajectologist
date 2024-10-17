import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  login: string;
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  login: string;
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  birthday: string;
}
