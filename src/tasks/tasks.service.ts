import {Injectable, NotFoundException} from '@nestjs/common';
import { Task, TasksStatus } from "./tasks.model";
import * as uuid from "uuid";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {filter} from "rxjs/operators";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }
    getTaskById(id : string): Task {
        const task = this.tasks.find(task => task.id === id);
        if(!task) {
            throw  new NotFoundException(`Task With ID "${id}" not found`);
        } else {
            return task;
        }

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
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id:string, status:TasksStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto) : Task[]{
        const { search, status }  = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }
}
