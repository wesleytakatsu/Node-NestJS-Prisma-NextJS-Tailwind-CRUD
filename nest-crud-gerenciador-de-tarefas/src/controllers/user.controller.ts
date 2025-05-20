import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PrismaService } from '../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserBody } from '../dtos/user/create-user-body';
import { SelectUserBody } from '../dtos/user/select-user-body';

@Controller('user')
export class UserController {
    constructor(private prisma: PrismaService) { }

    @ApiOperation({ summary: 'Cadastro de usuário' })
    @ApiBody({
        description: 'Dados para cadastro do usuário',
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Nome do Usuário',
                    description: 'Nome completo do usuário',
                    minLength: 3,
                    maxLength: 50,
                },
                username: {
                    type: 'string',
                    example: 'teste',
                    description: 'Login único do usuário',
                    minLength: 3,
                    maxLength: 50,
                },
                password: {
                    type: 'string',
                    example: '1234',
                    description: 'Senha do usuário',
                    minLength: 3,
                    maxLength: 50,
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Login realizado com sucesso.',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Login realizado com sucesso' },
                status: { type: 'number', example: 201 },
                token: { type: 'string', example: 'OK' },
                userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                userName: { type: 'string', example: 'Teste do Wesley' },
            },
        },
    })
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



    @ApiOperation({ summary: 'Lista todos os usuários cadastrados' })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuários retornada com sucesso.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                    name: { type: 'string', example: 'Teste do Wesley' },
                    username: { type: 'string', example: 'teste' },
                },
            },
        },
    })
    @Get()
    async getUsers() {
        const users = await this.prisma.user.findMany();
        return users.map(user => plainToInstance(SelectUserBody, user));
    }

    @ApiOperation({ summary: 'Lista os usuários cadastrados com paginação' })
    @ApiParam({
        name: 'page',
        required: true,
        description: 'Número da página',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuários retornada com sucesso.',
        schema: {
            type: 'object',
            properties: {
                users: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                            name: { type: 'string', example: 'Teste do Wesley' },
                            username: { type: 'string', example: 'teste' },
                        },
                    },
                },
                totalUsers: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 2 },
                hasNextPage: { type: 'boolean', example: true },
                hasPreviousPage: { type: 'boolean', example: false },
                nextPage: { type: 'number', example: 2 },
                previousPage: { type: 'number', example: null },
            },
        },
    })
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


    @ApiOperation({ summary: 'Login do usuário' })
    @ApiBody({
        description: 'Credenciais de login do usuário',
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'teste',
                    description: 'Login único do usuário',
                    minLength: 3,
                    maxLength: 50,
                },
                password: {
                    type: 'string',
                    example: '1234',
                    description: 'Senha do usuário',
                    minLength: 3,
                    maxLength: 50,
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Login realizado com sucesso.',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Login realizado com sucesso' },
                status: { type: 'number', example: 201 },
                token: { type: 'string', example: 'OK' },
                userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                userName: { type: 'string', example: 'Teste do Wesley' },
            },
        },
    })
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
