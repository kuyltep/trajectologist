import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GetShortUserDto } from 'src/user/dto/get.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ type: GetShortUserDto })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.loginUser(loginUserDto);
  }
  @Post('/register')
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ type: GetShortUserDto })
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<GetShortUserDto> {
    return this.authService.registerUser(registerUserDto);
  }
}
