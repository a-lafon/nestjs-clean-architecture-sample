import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { DatabaseTodoRepository } from './database-todo.repository';
import { UserEntity } from '../entities/user.entity';
import { DatabaseUserRepository } from './database-user.repository';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { UserRepository } from '../../domain/repositories/user.repository';

const databaseTodoRepositoryProvider = {
  provide: TodoRepository,
  useClass: DatabaseTodoRepository,
};

const databaseUserRepositoryProvider = {
  provide: UserRepository,
  useClass: DatabaseUserRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, UserEntity])],
  providers: [databaseTodoRepositoryProvider, databaseUserRepositoryProvider],
  exports: [databaseTodoRepositoryProvider, databaseUserRepositoryProvider],
})
export class RepositoriesModule {}
