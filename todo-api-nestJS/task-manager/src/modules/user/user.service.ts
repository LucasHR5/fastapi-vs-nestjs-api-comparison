import * as bcrypt from "bcrypt";
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }


    async create(data: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email},
        });

        if (existingUser) {
            throw new BadRequestException(`User with email ${data.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);


        return this.prisma.user.create({ 
            data: {
                ...data,
                password: hashedPassword,
            }
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            include: { tasks: true }
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { tasks: true }
        });

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        return user;
    }

    async update(id: number, data: UpdateUserDto) {
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.user.delete({
            where: { id },
        });
    }
}
