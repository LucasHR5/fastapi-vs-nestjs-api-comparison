import { Priority, Status } from "../../../generated/prisma/enums";
import {
    IsOptional,
    IsEnum,
} from 'class-validator';

export class filterTaskDto {
    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;
}