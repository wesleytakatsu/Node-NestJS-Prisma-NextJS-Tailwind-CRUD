import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateTarefaBody } from '../dtos/user/create-tarefa-body';
import { SelectUserBody } from '../dtos/tarefa/select-user-body';

@Controller('tasks')
export class TaskController {
  constructor(private prisma: PrismaService) {}

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

  @Get('user/:userId')
  async getTasks(@Param('userId') userId: string) {
    return this.prisma.tarefa.findMany({ where: { userId } });
  }

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

  @Get(':taskId')
  async getTask(@Param('taskId') taskId: string) {
    return this.prisma.tarefa.findUnique({ where: { id: taskId } });
  }

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

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    const taskExists = await this.prisma.tarefa.findUnique({ where: { id: taskId } });
    if (!taskExists) {
      return { message: 'Tarefa não encontrada', status: 404 };
    }

    return this.prisma.tarefa.delete({ where: { id: taskId } });
  }

  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: string, @Body() body: CreateTarefaBody) {
    const { title, description, completed } = body;

    const taskExists = await this.prisma.tarefa.findUnique({ where: { id: taskId } });
    if (!taskExists) {
      return { message: 'Tarefa não encontrada', status: 404 };
    }

    return this.prisma.tarefa.update({
      where: { id: taskId },
      data: { title, description, completed },
    });
  }
}
