import {Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import {Task, TasksStatus} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerivce: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        console.log(filterDto);
        if(Object.keys(filterDto).length){
            return this.tasksSerivce.getTasksWithFilter(filterDto);
        } else {
            return this.tasksSerivce.getAllTasks();
        }

    }
    @Get("/:id")
    getTaskById(@Param('id') id:string): Task {
        return this.tasksSerivce.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
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
