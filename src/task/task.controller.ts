import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/:userId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Param('userId') userId: string, @Body() task: TaskDto) {
    const taskDb = await this.taskService.create(userId, task);

    return taskDb;
  }

  @Get()
  async getAll(@Param('userId') userId: string) {
    const tasks = this.taskService.getAll(userId);

    return tasks;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:taskId')
  async modifyCompleted(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    await this.taskService.modifyCompleted(userId, taskId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/:taskId')
  async update(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
    @Body() task: TaskDto,
  ) {
    await this.taskService.update(userId, taskId, task);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:taskId')
  async remove(
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    await this.taskService.remove(userId, taskId);
  }
}
