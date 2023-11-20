import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../../domain/model/todo.model';
import { TodoRepository } from '../../domain/repositories/todo.repository';

@Injectable()
export class UpdateTodoUsecase {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(id: number, todo: Todo): Promise<Todo> {
    return await this.todoRepository.update(id, todo);
  }
}
