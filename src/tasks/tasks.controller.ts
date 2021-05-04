import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerivce: TasksService) {}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksSerivce.getAllTasks();
    }

    @Post()
    createTasks(@Body('title') title:string,
                @Body('description') description:string) : Task[] {
        console.log("HELLO");
        return this.tasksSerivce.createTasks(title,description);
    }
}
