import { Inject, Injectable } from '@nestjs/common';
import { Todo } from '../../domain/model/todo.model';
import { TodoRepository } from '../../domain/repositories/todo.repository';

@Injectable()
export class GetTodoUsecase {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(id: number): Promise<Todo> {
    return await this.todoRepository.findById(id);
  }
}
