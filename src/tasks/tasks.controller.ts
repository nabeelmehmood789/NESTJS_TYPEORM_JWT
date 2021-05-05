import { Controller, Get, Post, Body, Param, Delete, Patch} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import {Task, TasksStatus} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerivce: TasksService) {}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksSerivce.getAllTasks();
    }
    @Get("/:id")
    getTaskById(@Param('id') id:string): Task {
        return this.tasksSerivce.getTaskById(id);
    }

    @Post()
    createTasks(@Body() createTaskDto : CreateTaskDto) : Task {
        return this.tasksSerivce.createTasks(createTaskDto);
    }

    @Delete(":id")
    deleteTasks(@Param('id') id:string): void {
         this.tasksSerivce.deleteTask(id);
    }

    @Patch(":id/status")
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TasksStatus
    ):Task {
        return this.tasksSerivce.updateTaskStatus(id,status);
    }

}
