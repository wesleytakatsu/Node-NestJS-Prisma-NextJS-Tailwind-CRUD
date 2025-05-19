import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
// import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateTarefaBody } from './dtos/create-tarefa-body';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) { }

  @Get('')
  getTeste() {
    return {
      message: 'Está funcionando e aguardando requisições',
      status: 200,
    }
  }

  // criar um usuario
  @Post('user')
  async createUser(@Body() body: CreateUserBody) {
    const { name, username, password } = body;

    const userExists = await this.prisma.user.findUnique({
      where: {
        username
      }
    });
    if (userExists) {
      return {
        message: 'Usuario já existe',
        status: 400
      }
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        username,
        password
      }
    });
    return user;
  }

  // criar tarefa do usuario
  @Post('tasks')
  async createTask(@Body() body: CreateTarefaBody) {
    const { title, description, userId } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      return {
        message: 'Usuario não encontrado',
        status: 404
      }
    }

    const task = await this.prisma.tarefa.create({
      data: {
        title,
        description,
        userId
      }
    });
    return task;
  }

  // listar tarefas do usuario
  @Get('tasks/:userId')
  async getTasks(@Body() body: { userId: string }) {
    const tasks = await this.prisma.tarefa.findMany({
      where: {
        userId: body.userId
      }
    });
    return tasks;
  }

  // listar todas as tarefas
  @Get('tasks')
  async getAllTasks() {
    const tasks = await this.prisma.tarefa.findMany();
    return tasks;
  }

  // listar todas as tarefas por paginação
  @Get('tasks/page/:page')
  async getTasksPage(@Param('page') page: number) {
    const pageSize = 10;
    const tasks = await this.prisma.tarefa.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    });
    return tasks;
  }

  // mostrar tarefa
  @Get('tasks/:taskId')
  async getTask(@Param('taskId') taskId: string) {
    const task = await this.prisma.tarefa.findUnique({
      where: {
        id: taskId
      }
    });
    return task;
  }

  // completar tarefa
  @Post('tasks/complete')
  async completeTask(@Body() body: { taskId: string }) {
    const task = await this.prisma.tarefa.update({
      where: {
        id: body.taskId
      },
      data: {
        completed: true
      }
    });
    return task;
  }
  // deletar tarefa
  @Delete('tasks/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    const taskExists = await this.prisma.tarefa.findUnique({
      where: {
        id: taskId
      }
    });
    if (!taskExists) {
      return {
        message: 'Tarefa não encontrada',
        status: 404
      }
    }

    const task = await this.prisma.tarefa.delete({
      where: {
        id: taskId
      }
    });
    return task;
  }

  // alterar tarefa
  @Put('tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() body: CreateTarefaBody) {
    const { title, description, completed } = body;
    const taskExists = await this.prisma.tarefa.findUnique({
      where: {
        id: taskId
      }
    });
    if (!taskExists) {
      return {
        message: 'Tarefa não encontrada',
        status: 404
      }
    }

    const task = await this.prisma.tarefa.update({
      where: {
        id: taskId
      },
      data: {
        title,
        description,
        completed
      }
    });
    return task;
  }
}
