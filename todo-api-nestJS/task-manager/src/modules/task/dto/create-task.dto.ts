import { Priority, Status } from "../../../generated/prisma/enums";
import {
    IsString,
    IsOptional,
    IsEnum,
    IsDateString,
    IsInt,
} from 'class-validator';
export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsOptional()   
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;

    @IsOptional()
    dueDate?: Date;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    labels?: string;
}