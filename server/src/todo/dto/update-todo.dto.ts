import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';

export enum TodoStatus {
  CREATED = 'CREATED',
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
  PROBLEM = 'PROBLEM',
}

export class UpdateTodoDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  problem_desc?: string;
}