import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from "./tasks.model";
import * as uuid from "uuid";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }
    getTaskById(id : string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTasks(createTaskDto: CreateTaskDto) :Task {
        const {title,description} = createTaskDto;
        const task : Task = {
            id: uuid.v1(),
            title,
            description,
            status: TasksStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id:string):void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id:string, status:TasksStatus):Task{
        console.log(status);
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
