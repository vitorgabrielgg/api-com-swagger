import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaRepositoryModule } from 'src/prisma-repository/prisma-repository.module';
import { PrismaRepositoryService } from 'src/prisma-repository/prisma-repository.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [TaskController],
  imports: [PrismaRepositoryModule],
  providers: [TaskService, PrismaRepositoryService, AuthGuard],
})
export class TaskModule {}
