import { Module } from '@nestjs/common';
import { GetTodoUsecase } from './get-todo.usecase';
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
