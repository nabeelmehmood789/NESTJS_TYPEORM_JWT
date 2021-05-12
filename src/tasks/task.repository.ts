import {EntityRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksStatus} from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        if(search){
            query.andWhere("(task.title LIKE :search OR task.description LIKE :search)",{search: `%${search}%`})
        }
        if (status) {
            query.andWhere('task.status = :status', {status})
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.save();
        return task;
    }
}