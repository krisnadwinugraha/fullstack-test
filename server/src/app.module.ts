import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }), 
    TodoModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}