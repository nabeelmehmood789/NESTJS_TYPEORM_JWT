import {TasksStatus} from "../tasks.model";
import {IsIn, IsOptional} from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TasksStatus.OPEN, TasksStatus.IN_PROGRESS, TasksStatus.DONE])
    status: TasksStatus;

    @IsOptional()
    search: string;
}