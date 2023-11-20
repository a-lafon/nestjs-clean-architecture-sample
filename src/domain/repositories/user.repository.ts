import { User } from '../model/user.model';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
}

export const UserRepository = Symbol('UserRepository');
