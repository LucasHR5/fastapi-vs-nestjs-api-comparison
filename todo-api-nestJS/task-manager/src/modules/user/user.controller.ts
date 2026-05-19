import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    findAllUsers() {
        return this.userService.findAll();
    }

    @Get(":id")
    findUserById(@Param("id", ParseIntPipe) id: number,) {
        return this.userService.findOne(id);
    }

    @Patch(":id")
    updateUser(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto
    ) { }

    @Delete(":id")
    removeUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
