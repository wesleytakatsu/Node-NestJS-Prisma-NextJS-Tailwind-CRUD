import { Body, Controller, Get, Post, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
// import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateTarefaBody } from './dtos/create-tarefa-body';
import { SelectUserBody } from './dtos/select-user-body';

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
    return plainToInstance(SelectUserBody, user);
  }

  // listar todos os usuarios
  @Get('user')
  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(user => plainToInstance(SelectUserBody, user));
  }

  // listar todos os usuarios de forma paginada
  @Get('user/page/:page')
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
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    return {
      users: users.map(user => plainToInstance(SelectUserBody, user)),
      totalUsers,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    };
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
      console.log('Userid:', userId);
      console.log('Usuario não encontrado ao criar tarefa');
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    const task = await this.prisma.tarefa.create({
      data: {
        title,
        description,
        userId
      }
    });
    console.log('Tarefa criada com sucesso');
    console.log('Tarefa:', task);
    return task;
  }

  // listar tarefas do usuario sem paginacao
  @Get('tasks/user/:userId')
  async getTasks(@Body() body: { userId: string }) {
    const tasks = await this.prisma.tarefa.findMany({
      where: {
        userId: body.userId
      }
    });
    return tasks;
  }

  // listar todas as tarefas com o usuario
  @Get('tasks')
  async getAllTasks() {
    const tasks = await this.prisma.tarefa.findMany({
      include: {
        user: true
      }
    });
    tasks.forEach(task => {
      if (task.user) {
        task.user = plainToInstance(SelectUserBody, task.user);
      }
    });
    return tasks;
  }

  // listar todas as tarefas por paginação
  @Get('tasks/page/:page')
  async getTasksPage(@Param('page') page: number) {
    const pageSize = 5;
    const tasks = await this.prisma.tarefa.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: true
      }
    });
    tasks.forEach(task => {
      if (task.user) {
        task.user = plainToInstance(SelectUserBody, task.user);
      }
    });
    const totalTasks = await this.prisma.tarefa.count();
    const totalPages = Math.ceil(totalTasks / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;
    const tasksWithPagination = {
      tasks,
      totalTasks,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    };
    return tasksWithPagination;
  }

  // listar as tarefas do usuario por paginação
  @Get('tasks/page/:idUser/:page')
  async getUserTasksPage(
    @Param('idUser') idUser: string,
    @Param('page') page: number
  ) {
    const pageSize = 5;
    const tasks = await this.prisma.tarefa.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        userId: idUser
      },
      include: {
        user: true
      }
    });

    tasks.forEach(task => {
      if (task.user) {
        task.user = plainToInstance(SelectUserBody, task.user);
      }
    });

    const totalTasks = await this.prisma.tarefa.count({
      where: { userId: idUser }
    });
    const totalPages = Math.ceil(totalTasks / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;
    
    const tasksWithPagination = {
      tasks,
      totalTasks,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    };
    return tasksWithPagination;
  }
 
  // user login
  @Post('login')
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    });
    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }
    if (user.password !== password) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }
    const token = "OK";
    const userId = user.id;
    const userName = user.name;
    return {
      message: 'Login realizado com sucesso',
      status: 201,
      token,
      userId,
      userName
    }
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
    if (!task) {
      console.log('Tarefa não encontrada ao completar');
      console.log('TaskId:', body.taskId);
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    console.log('Tarefa completada com sucesso');
    console.log('Tarefa:', task);
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
