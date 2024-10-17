import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/auth/dto/auth.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllUserDto, GetShortUserDto } from './dto/get.user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(login: string): Promise<GetShortUserDto> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          login,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<GetShortUserDto> {
    try {
      const exist_user = await this.prismaService.user.findFirst({
        where: {
          login: registerUserDto.login,
        },
      });
      if (exist_user) {
        throw new BadRequestException('USER ALREAY EXIST');
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);
      const new_user = await this.prismaService.user.create({
        data: {
          ...registerUserDto,
          password: hashedPassword,
        },
      });
      return new_user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneAllInfo(id: string): Promise<GetAllUserDto> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
        include: {
          profession: true,
          user_competencies: {
            include: {
              competency: true,
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
