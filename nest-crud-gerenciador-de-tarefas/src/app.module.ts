import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [],
  controllers: [UserController, TaskController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
