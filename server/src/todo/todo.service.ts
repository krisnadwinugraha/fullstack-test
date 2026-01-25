import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from '@prisma/client';
import { AiService } from './ai.service';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService, 
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        status: TodoStatus.CREATED,
      },
    });
  }

  findAll(search?: string) {
    return this.prisma.todo.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: 'insensitive', // Case-insensitive search
            },
          }
        : {},
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const dataToUpdate: any = {
      status: updateTodoDto.status,
      problem_desc: updateTodoDto.problem_desc,
    };

    if (
      updateTodoDto.status === TodoStatus.PROBLEM && 
      updateTodoDto.problem_desc
    ) {
      console.log(`🧠 Triggering AI for problem: "${updateTodoDto.problem_desc}"`);
      
      // Now 'this.aiService' will work because it's defined in the constructor
      const aiResponse = await this.aiService.analyzeProblem(updateTodoDto.problem_desc);
      
      console.log(`✅ AI Responded: ${aiResponse ? aiResponse.substring(0, 20) + '...' : 'NULL'}`);
      
      if (aiResponse) {
        dataToUpdate.ai_recommendation = aiResponse;
      }
    }

    return this.prisma.todo.update({
      where: { id },
      data: dataToUpdate,
    });
  }
}