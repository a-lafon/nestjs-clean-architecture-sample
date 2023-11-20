import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../../domain/model/todo.model';
import { TodoRepository } from '../../domain/repositories/todo.repository';

@Injectable()
export class CreateTodoUsecase {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(todo: Todo): Promise<Todo> {
    return await this.todoRepository.create(todo);
  }
}
