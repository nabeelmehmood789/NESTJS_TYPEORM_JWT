import {TasksStatus} from "../task-status.enum"
import {IsIn, IsOptional} from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
    status: TasksStatus;

    @IsOptional()
    search: string;
}