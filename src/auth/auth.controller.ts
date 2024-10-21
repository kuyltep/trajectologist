import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllUserDto, GetShortUserDto } from 'src/user/dto/get.user.dto';

@ApiTags('auth')
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

  @ApiBearerAuth('auth')
  @Get('/profile')
  @ApiResponse({ type: GetAllUserDto })
  async profile(@Request() req): Promise<GetAllUserDto> {
    const { user_id } = req.user;
    return this.authService.profile(user_id);
  }
}
