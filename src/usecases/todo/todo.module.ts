import { Module } from '@nestjs/common';
import { GetTodoUsecase } from './get-todo.usecase';
import { DatabaseTodoRepository } from 'src/infrastructure/repositories/database-todo.repository';
import { TODO_REPOSITORY_TOKEN } from 'src/infrastructure/constants';
import { GetTodosUsecase } from './get-todos.usecase';
import { CreateTodoUsecase } from './create-todo.usecase';
import { UpdateTodoUsecase } from './update-todo.usecase';
import { DeleteTodoUsecase } from './delete-todo.usecase';

@Module({
  providers: [
    GetTodoUsecase,
    GetTodosUsecase,
    CreateTodoUsecase,
    UpdateTodoUsecase,
    DeleteTodoUsecase,
    { provide: TODO_REPOSITORY_TOKEN, useClass: DatabaseTodoRepository },
  ],
  exports: [
    GetTodoUsecase,
    GetTodosUsecase,
    CreateTodoUsecase,
    UpdateTodoUsecase,
    DeleteTodoUsecase,
  ],
})
export class TodoUseCaseModule {}
