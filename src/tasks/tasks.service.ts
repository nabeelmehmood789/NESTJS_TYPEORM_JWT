import {Injectable, NotFoundException} from '@nestjs/common';
// import { Task, TasksStatus } from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TasksStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }
    async deleteTask(id:number): Promise<void>{
        const found = await this.getTaskById(id);
        const result = await this.taskRepository.delete(found.id);

    }

    async updateTaskStatus(id:number, status:TasksStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async getTaskById(id:number) : Promise<Task>{
        const task = await this.taskRepository.findOne(id);
        if(!task) {
            throw  new NotFoundException(`Task With ID "${id}" not found`);
        } else {
            return task;
        }
    }

   async createTask(createTaskDto: CreateTaskDto) : Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]>{
        return this.taskRepository.getTask(filterDto);
    }

}
