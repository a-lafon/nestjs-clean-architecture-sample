import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from 'src/domain/repositories/todo.repository';
import { TODO_REPOSITORY_TOKEN } from 'src/infrastructure/constants';

@Injectable()
export class DeleteTodoUsecase {
  constructor(
    @Inject(TODO_REPOSITORY_TOKEN)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(id: number): Promise<void> {
    return await this.todoRepository.delete(id);
  }
}
