import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}