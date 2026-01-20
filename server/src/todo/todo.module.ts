import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from '../prisma.service'; 
import { AiService } from './ai.service';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService, 
    PrismaService, 
    AiService
  ], 
})
export class TodoModule {}