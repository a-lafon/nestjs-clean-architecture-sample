import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoUseCaseModule } from 'src/usecases/todo/todo.module';

@Module({
  imports: [TodoUseCaseModule],
  controllers: [TodoController],
})
export class TodoControllerModule {}
