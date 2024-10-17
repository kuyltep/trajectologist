import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from './dto/auth.user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { GetAllUserDto, GetShortUserDto } from 'src/user/dto/get.user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOne(loginUserDto.login);
      const isCompare = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isCompare) {
        throw new UnauthorizedException();
      }
      return {
        access_token: await this.jwtService.signAsync({
          login: user.login,
          user_id: user.id,
        }),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<GetShortUserDto> {
    try {
      return await this.userService.register(registerUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async profile(id: string): Promise<GetAllUserDto> {
    try {
      const user = await this.userService.findOneAllInfo(id);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
