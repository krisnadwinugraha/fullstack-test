import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';

// We manually define this to match Prisma, or import from @prisma/client if generated
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
  // If status is PROBLEM, this field should ideally be checked (custom logic in Service)
  problem_desc?: string;
}