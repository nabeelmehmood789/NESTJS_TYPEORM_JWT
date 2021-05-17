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
    ParseIntPipe, UseGuards
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {Task} from "./task.entity";
import {TasksStatus} from "./task-status.enum";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";


@Controller('tasks')
@UseGuards(AuthGuard())
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
    createTasks(
            @Body() createTaskDto : CreateTaskDto,
            @GetUser() user: User
        ) : Promise<Task> {
        return this.tasksSerivce.createTask(createTaskDto, user);
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
