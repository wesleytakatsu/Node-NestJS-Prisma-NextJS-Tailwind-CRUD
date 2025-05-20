import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { IsNotEmpty, Length, IsBoolean, IsOptional } from 'class-validator';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PrismaService } from '../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateTarefaBody } from '../dtos/tarefa/create-tarefa-body';
import { UpdateTarefaBody } from '../dtos/tarefa/update-tarfefa-body';
import { SelectUserBody } from '../dtos/user/select-user-body';

@Controller('tasks')
export class TaskController {
    constructor(private prisma: PrismaService) { }


    @ApiOperation({ summary: 'Cadastro de tarefa' })
    @ApiBody({
        description: 'Dados para cadastro do usuário',
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    example: 'tarefa de teste',
                    description: 'Título da tarefa',
                    minLength: 3,
                    maxLength: 50,
                },
                description: {
                    type: 'string',
                    example: 'descrição de teste',
                    description: 'Descrição da tarefa',
                    minLength: 3,
                    maxLength: 50,
                },
                userId: {
                    type: 'string',
                    example: 'cmaueocw80000ws97caopdg4e',
                    description: 'ID do usuário dono da tarefa',
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
                "id": { type: 'string', example: 'cmauf43m70001wsolzp9nx6ov' },
                "title": { type: 'string', example: 'tarefa de teste' },
                "description": { type: 'string', example: 'descrição de teste' },
                "completed": { type: 'boolean', example: false },
                "userId": { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                "createdAt": { type: 'string', example: '2025-05-19T01:40:04.303Z' },
                "updatedAt": { type: 'string', example: '2025-05-19T01:40:04.303Z' },
            },
        },
    })
    @Post()
    async createTask(@Body() body: CreateTarefaBody) {
        const { title, description, completed, userId } = body;

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
        }

        return this.prisma.tarefa.create({
            data: {
                title,
                description,
                completed: completed ?? false,
                userId,
            },
        });
    }


    @ApiOperation({ summary: 'Listar todas as tarefas' })
    @ApiResponse({
        status: 200,
        description: 'Lista de tarefas',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'cmauf43m70001wsolzp9nx6ov' },
                    title: { type: 'string', example: 'tarefa de teste' },
                    description: { type: 'string', example: 'descrição de teste' },
                    completed: { type: 'boolean', example: false },
                    userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                    createdAt: { type: 'string', example: '2025-05-19T01:40:04.303Z' },
                    updatedAt: { type: 'string', example: '2025-05-19T01:40:04.303Z' },
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                            name: { type: 'string', example: 'Teste do Wesley' },
                            username: { type: 'string', example: 'teste' },
                        },
                    },
                },
            },
        },
    })
    @Get()
    async getAllTasks() {
        const tasks = await this.prisma.tarefa.findMany({ include: { user: true } });
        tasks.forEach(task => {
            if (task.user) {
                task.user = plainToInstance(SelectUserBody, task.user);
            }
        });
        return tasks;
    }


    @ApiOperation({ summary: 'Listar tarefas de um usuário' })
    @ApiParam({
        name: 'userId',
        required: true,
        description: 'ID do usuário',
        example: 'cmaueocw80000ws97caopdg4e',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tarefas do usuário',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'cmauf43m70001wsolzp9nx6ov' },
                    title: { type: 'string', example: 'tarefa de teste' },
                    description: { type: 'string', example: 'descrição de teste' },
                    completed: { type: 'boolean', example: false },
                    userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                    createdAt: { type: 'string', example: '2025-05-19T01:40:04.303Z' },
                    updatedAt: { type: 'string', example: '2025-05-19T01:40:04.303Z' },
                },
            },
        },
    })
    @Get('user/:userId')
    async getTasks(@Param('userId') userId: string) {
        return this.prisma.tarefa.findMany({ where: { userId } });
    }


    @ApiOperation({ summary: 'Listar todas as tarefas com paginação' })
    @ApiParam({
        name: 'page',
        required: true,
        description: 'Número da página',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tarefas com paginação',
        schema: {
            type: 'object',
            properties: {
                tasks: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'cmavmk38t0002wsaqqs1r754b' },
                            title: { type: 'string', example: 'Tarefa nova' },
                            description: { type: 'string', example: 'Fazer café' },
                            completed: { type: 'boolean', example: false },
                            userId: { type: 'string', example: 'cmavmiy8x0000wsaqt2yav62a' },
                            createdAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                            updatedAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: 'cmavmiy8x0000wsaqt2yav62a' },
                                    name: { type: 'string', example: 'Mais Um Teste' },
                                    username: { type: 'string', example: 'teste2' },
                                },
                            },
                        },
                    },
                },
                totalTasks: { type: 'number', example: 7 },
                totalPages: { type: 'number', example: 2 },
                hasNextPage: { type: 'boolean', example: true },
                hasPreviousPage: { type: 'boolean', example: false },
                nextPage: { type: 'number', example: 2 },
                previousPage: { type: 'number', example: null },
            },
        },
    })
    @Get('page/:page')
    async getTasksPage(@Param('page') page: number) {
        const pageSize = 5;
        const tasks = await this.prisma.tarefa.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: { user: true },
        });

        tasks.forEach(task => {
            if (task.user) {
                task.user = plainToInstance(SelectUserBody, task.user);
            }
        });

        const totalTasks = await this.prisma.tarefa.count();
        const totalPages = Math.ceil(totalTasks / pageSize);

        return {
            tasks,
            totalTasks,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
        };
    }




    @ApiOperation({ summary: 'Listar tarefas de um usuário com paginação' })
    @ApiParam({
        name: 'idUser',
        required: true,
        description: 'ID do usuário',
        example: 'cmaueocw80000ws97caopdg4e',
    })
    @ApiParam({
        name: 'page',
        required: true,
        description: 'Número da página',
        example: 1,
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tarefas do usuário com paginação',
        schema: {
            type: 'object',
            properties: {
                tasks: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'cmavmk38t0002wsaqqs1r754b' },
                            title: { type: 'string', example: 'Tarefa nova' },
                            description: { type: 'string', example: 'Fazer café' },
                            completed: { type: 'boolean', example: false },
                            userId: { type: 'string', example: 'cmavmiy8x0000wsaqt2yav62a' },
                            createdAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                            updatedAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                                    name: { type: 'string', example: 'Teste do Wesley' },
                                    username: { type: 'string', example: 'teste' },
                                },
                            },
                        },
                    },
                },
                totalTasks: { type: 'number', example: 7 },
                totalPages: { type: 'number', example: 2 },
                hasNextPage: { type: 'boolean', example: true },
                hasPreviousPage: { type: 'boolean', example: false },
                nextPage: { type: 'number', example: 2 },
                previousPage: { type: 'number', example: null },
            },
        },
    })
    @Get('page/:idUser/:page')
    async getUserTasksPage(@Param('idUser') idUser: string, @Param('page') page: number) {
        const pageSize = 5;
        const tasks = await this.prisma.tarefa.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where: { userId: idUser },
            include: { user: true },
        });

        tasks.forEach(task => {
            if (task.user) {
                task.user = plainToInstance(SelectUserBody, task.user);
            }
        });

        const totalTasks = await this.prisma.tarefa.count({ where: { userId: idUser } });
        const totalPages = Math.ceil(totalTasks / pageSize);

        return {
            tasks,
            totalTasks,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
        };
    }



    @ApiOperation({ summary: 'Listar tarefa por ID' })
    @ApiParam({
        name: 'taskId',
        required: true,
        description: 'ID da tarefa',
        example: 'cmavmk38t0002wsaqqs1r754b',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarefa encontrada',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'cmavmk38t0002wsaqqs1r754b' },
                title: { type: 'string', example: 'Tarefa nova' },
                description: { type: 'string', example: 'Fazer café' },
                completed: { type: 'boolean', example: false },
                userId: { type: 'string', example: 'cmavmiy8x0000wsaqt2yav62a' },
                createdAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                updatedAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                        name: { type: 'string', example: 'Teste do Wesley' },
                        username: { type: 'string', example: 'teste' },
                    },
                },
            },
        },
    })
    @Get(':taskId')
    async getTask(@Param('taskId') taskId: string) {
        const task = await this.prisma.tarefa.findUnique({
            where: { id: taskId },
            include: { user: true },
        });

        if (!task) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        if (task.user) {
            task.user = plainToInstance(SelectUserBody, task.user);
        }

        return task;
    }



    @ApiOperation({ summary: 'Completar tarefa' })
    @ApiResponse({
        status: 201,
        description: 'Tarefa completada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'cmavmk38t0002wsaqqs1r754b' },
                title: { type: 'string', example: 'Tarefa nova' },
                description: { type: 'string', example: 'Fazer café' },
                completed: { type: 'boolean', example: true },
                userId: { type: 'string', example: 'cmavmiy8x0000wsaqt2yav62a' },
                createdAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
                updatedAt: { type: 'string', example: '2025-05-19T21:56:13.805Z' },
            },
        },
    })
    @ApiBody({
        description: 'ID da tarefa a ser completada',
        schema: {
            type: 'object',
            properties: {
                taskId: { type: 'string', example: 'cmawhii4a0001ws25f4eq7942' },
            },
        },
    })
    @Post('complete')
    async completeTask(@Body() body: { taskId: string }) {
        const task = await this.prisma.tarefa.update({
            where: { id: body.taskId },
            data: { completed: true },
        });

        if (!task) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        return task;
    }


    @ApiOperation({ summary: 'Deletar tarefa' })
    @ApiParam({
        name: 'taskId',
        required: true,
        description: 'ID da tarefa',
        example: 'cmawhii4a0001ws25f4eq7942',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarefa deletada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'cmawhii4a0001ws25f4eq7942' },
                title: { type: 'string', example: 'abc' },
                description: { type: 'string', example: '1234567' },
                completed: { type: 'boolean', example: false },
                userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                createdAt: { type: 'string', example: '2025-05-20T12:28:04.276Z' },
                updatedAt: { type: 'string', example: '2025-05-20T12:28:04.276Z' },
            },
        },
    })
    @Delete(':taskId')
    async deleteTask(@Param('taskId') taskId: string) {
        const taskExists = await this.prisma.tarefa.findUnique({ where: { id: taskId } });
        if (!taskExists) {
            return { message: 'Tarefa não encontrada', status: 404 };
        }

        return this.prisma.tarefa.delete({ where: { id: taskId } });
    }


    @ApiOperation({ summary: 'Atualizar tarefa' })
    @ApiParam({
        name: 'taskId',
        required: true,
        description: 'ID da tarefa',
        example: 'cmawhii4a0001ws25f4eq7942',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarefa atualizada com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'cmawhii4a0001ws25f4eq7942' },
                title: { type: 'string', example: 'abc' },
                description: { type: 'string', example: '1234567' },
                completed: { type: 'boolean', example: false },
                userId: { type: 'string', example: 'cmaueocw80000ws97caopdg4e' },
                createdAt: { type: 'string', example: '2025-05-20T12:28:04.276Z' },
                updatedAt: { type: 'string', example: '2025-05-20T12:28:04.276Z' },
            },
        },
    })
    @ApiBody({
        description: 'Dados para atualizar a tarefa',
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    example: 'Tarefa atualizada',
                    description: 'Título da tarefa',
                    minLength: 3,
                    maxLength: 50,
                },
                description: {
                    type: 'string',
                    example: 'Descrição atualizada',
                    description: 'Descrição da tarefa',
                    minLength: 3,
                    maxLength: 50,
                },
                completed: {
                    type: 'boolean',
                    example: false,
                    description: 'Indica se a tarefa foi completada',
                },
                userId: {
                    type: 'string',
                    example: 'cmaueocw80000ws97caopdg4e',
                    description: 'ID do usuário dono da tarefa',
                    minLength: 3,
                    maxLength: 50,
                },
            },
        },
    })
    @Put(':taskId')
    async updateTask(@Param('taskId') taskId: string, @Body() body: UpdateTarefaBody) {
        const taskExists = await this.prisma.tarefa.findUnique({ where: { id: taskId } });
        if (!taskExists) {
            throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
        }

        return this.prisma.tarefa.update({
            where: { id: taskId },
            data: body,
        });
    }
}
