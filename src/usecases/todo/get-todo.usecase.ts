import { Inject, Injectable } from '@nestjs/common';
import { Todo } from 'src/domain/model/todo.model';
import { TodoRepository } from 'src/domain/repositories/todo.repository';
import { TODO_REPOSITORY_TOKEN } from 'src/infrastructure/constants';

@Injectable()
export class GetTodoUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_TOKEN)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(id: number): Promise<Todo> {
    return await this.todoRepository.findById(id);
  }
}
