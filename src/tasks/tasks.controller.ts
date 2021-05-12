import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {Task} from "./task.entity";
import {TasksStatus} from "./task-status.enum";

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerivce: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) : Promise<Task[]>{
        return this.tasksSerivce.getTasks(filterDto);

    }
    @Get("/:id")
    getTaskById(@Param('id',ParseIntPipe) id:number): Promise<Task> {
        return this.tasksSerivce.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(@Body() createTaskDto : CreateTaskDto) : Promise<Task> {
        return this.tasksSerivce.createTask(createTaskDto);
    }
    //
    @Delete(":id")
    deleteTasks(@Param('id', ParseIntPipe) id:number): Promise<void> {
         return this.tasksSerivce.deleteTask(id);
    }

    @Patch(":id/status")
    updateTaskStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status',  TaskStatusValidationPipe) status:TasksStatus
    ): Promise<Task> {
        return this.tasksSerivce.updateTaskStatus(id,status);
    }



}
