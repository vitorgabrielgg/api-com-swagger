import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaRepositoryService } from 'src/prisma-repository/prisma-repository.service';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prismaRepositoryService: PrismaRepositoryService) {}

  async create(userId: string, task: TaskDto) {
    await this.verifyRepeatTask(userId, task.title);

    const createdTask = await this.prismaRepositoryService.task.create({
      data: {
        ...task,
        userId,
      },
    });

    return createdTask;
  }

  async getAll(userId: string) {
    const tasks = await this.prismaRepositoryService.task.findMany({
      where: {
        userId,
      },
    });

    return tasks;
  }

  async modifyCompleted(userId: string, taskId: string) {
    const task = await this.prismaRepositoryService.task.findUnique({
      where: {
        id: taskId,
        userId,
      },
    });

    await this.prismaRepositoryService.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        completed: !task.completed,
      },
    });
  }

  async update(userId: string, taskId: string, task: TaskDto) {
    await this.verifyRepeatTask(userId, task.title);

    await this.prismaRepositoryService.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: task,
    });
  }

  async remove(userId: string, taskId: string) {
    await this.prismaRepositoryService.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
  }

  private async verifyRepeatTask(userId: string, title: string) {
    const foundTask = await this.prismaRepositoryService.task.findFirst({
      where: {
        userId,
        title,
      },
    });

    if (foundTask) {
      throw new HttpException(
        'Already exists a task with this userId and title',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
