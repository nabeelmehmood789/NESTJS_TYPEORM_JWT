import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from "./tasks.model";
import * as uuid from "uuid";

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTasks(title:string, description:string) : Task[]{
        const task: Task = {
            id: uuid.v1(),
            title,
            description,
            status: TasksStatus.OPEN
        }
        console.log("HI");
        this.tasks.push(task);
        return this.tasks;
    }
}
