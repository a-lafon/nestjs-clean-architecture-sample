import { Todo } from '../entities/todo.entity';

export interface TodoRepositoyry {
  create(todo: Todo): Promise<Todo>;
  findById(id: number): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(todo: Todo): Promise<Todo>;
  delete(todo: Todo): Promise<void>;
}
