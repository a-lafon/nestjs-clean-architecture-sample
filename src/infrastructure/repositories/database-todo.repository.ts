import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/model/todo.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoEntityRepository: Repository<TodoEntity>,
  ) {}

  async create(todo: Todo): Promise<Todo> {
    const todoEntity = await this.todoEntityRepository.save(todo);
    return todoEntity;
  }

  async findById(id: number): Promise<Todo> {
    const todoEntity = await this.todoEntityRepository.findOne({
      where: { id },
    });
    return plainToInstance(Todo, todoEntity);
  }

  async findAll(): Promise<Todo[]> {
    const todosEntities = await this.todoEntityRepository.find();
    return todosEntities;
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    await this.todoEntityRepository.update(id, todo);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.todoEntityRepository.delete(id);
  }
}
