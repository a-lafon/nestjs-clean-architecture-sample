import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '../../domain/repositories/todo.repository';

@Injectable()
export class DeleteTodoUsecase {
  constructor(
    @Inject(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  async exec(id: number): Promise<void> {
    return await this.todoRepository.delete(id);
  }
}
