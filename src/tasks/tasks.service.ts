import {Injectable, NotFoundException} from '@nestjs/common';
// import { Task, TasksStatus } from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TasksStatus} from "./task-status.enum";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {
    }
    async deleteTask(id:number, user: User): Promise<void>{
        // const found = await this.getTaskById(id, user);
        // const taskId =  found.id;
        const result = await this.taskRepository.delete({id, userId: user.id});
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

    }

    async updateTaskStatus(id:number, status:TasksStatus, user: User): Promise<Task>{
        const task = await this.getTaskById(id,user);
        task.status = status;
        await task.save();
        return task;
    }

    async getTaskById(id:number, user: User) : Promise<Task>{
        const task = await this.taskRepository.findOne({where: { id, userId: user.id}});
        if(!task) {
            throw  new NotFoundException(`Task With ID "${id}" not found`);
        } else {
            return task;
        }
    }

   async createTask(createTaskDto: CreateTaskDto, user : User) : Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async getTasks(filterDto: GetTasksFilterDto, user : User) : Promise<Task[]>{
        return this.taskRepository.getTask(filterDto, user);
    }

}
