import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksStatus} from "./task-status.enum";
import {User} from "../auth/user.entity";
import {InternalServerErrorException, Logger} from "@nestjs/common";
import {filter} from "rxjs/operators";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger("Task Repository");
    async getTask(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        query.where("task.userId = :userId", {userId: user.id});
        if(search){
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)",{search: `%${search}%`})
        }
        if (status) {
            query.andWhere('task.status = :status', {status})
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch(error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Fitlers: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }

    }

    async createTask(createTaskDto: CreateTaskDto , user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch(error) {
            this.logger.error(`Failed to create task for user "${user.username}". Data: ${createTaskDto}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }
}