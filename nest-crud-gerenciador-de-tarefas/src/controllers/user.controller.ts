import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { SelectUserBody } from '../dtos/tarefa/select-user-body';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { name, username, password } = body;

    const userExists = await this.prisma.user.findUnique({ where: { username } });
    if (userExists) {
      return { message: 'Usuario já existe', status: 400 };
    }

    const user = await this.prisma.user.create({ data: { name, username, password } });
    return plainToInstance(SelectUserBody, user);
  }

  @Get()
  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(user => plainToInstance(SelectUserBody, user));
  }

  @Get('page/:page')
  async getUsersPage(@Param('page') page: number) {
    const pageSize = 5;
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalUsers = await this.prisma.user.count();
    const totalPages = Math.ceil(totalUsers / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      users: users.map(user => plainToInstance(SelectUserBody, user)),
      totalUsers,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage: hasNextPage ? page + 1 : null,
      previousPage: hasPreviousPage ? page - 1 : null,
    };
  }

  @Post('/login')
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    if (user.password !== password) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }

    return {
      message: 'Login realizado com sucesso',
      status: 201,
      token: 'OK',
      userId: user.id,
      userName: user.name,
    };
  }
}
