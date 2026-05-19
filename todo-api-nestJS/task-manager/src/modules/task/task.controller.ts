import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { filterTaskDto } from "./dto/filter-task-dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(
    @Body() data: CreateTaskDto,
    @Request() req: any,
  ) {
    return this.service.createTask(data, req.user.userId);
  }

  @Get()
  findAllTasks(
    @Query() filters: filterTaskDto,
  ) {
    return this.service.findAllTasks(filters);
  }

  @Get(':id')
  findTaskById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.findTaskById(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.service.updateTask(id, data);
  }

  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.deleteTask(id);
  }
}