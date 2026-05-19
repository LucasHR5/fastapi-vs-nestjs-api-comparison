import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { filterTaskDto } from "./dto/filter-task-dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }


    async createTask(data: CreateTaskDto, userId: number) {
        
        return this.prisma.task.create({ 
            data: {
                ...data,
                ownerId: userId
            }
         });
    }

    async findAllTasks(filters: filterTaskDto) {
        return this.prisma.task.findMany({
            where: {
                status: filters.status,
                priority: filters.priority,
            }
        });
    }

    async findTaskById(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: { owner: true },
        });

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    async updateTask(id: number, data: UpdateTaskDto) {
        await this.findTaskById(id); // Ensure task exists

        return this.prisma.task.update({
            where: { id },
            data,
        });

    }

    async deleteTask(id: number) {
        await this.findTaskById(id); // Ensure task exists

        return this.prisma.task.delete({
            where: { id },
        });

    }
}   