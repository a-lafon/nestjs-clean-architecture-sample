import { Todo } from '../model/todo.model';

export interface TodoRepository {
  create(todo: Todo): Promise<Todo>;
  findById(id: number): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(id: number, todo: Todo): Promise<Todo>;
  delete(id: number): Promise<void>;
}

export const TodoRepository = Symbol('TodoRepository');
