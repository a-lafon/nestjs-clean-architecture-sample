import { User } from '../model/user.model';

export interface UserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
