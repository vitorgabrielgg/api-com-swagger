import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { PrismaRepositoryService } from 'src/prisma-repository/prisma-repository.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaRepositoryService: PrismaRepositoryService,
  ) {}

  async create(user: CreateUserDto) {
    const foundUser = await this.prismaRepositoryService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (foundUser) {
      throw new HttpException(
        `User with email ${user.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);

    const createdUser = await this.prismaRepositoryService.user.create({
      data: {
        ...user,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return createdUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaRepositoryService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new HttpException(
        "Doesn't exists a user with this email",
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
