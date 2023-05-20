import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { DatabaseTodoRepository } from './database-todo.repository';
import { UserEntity } from '../entities/user.entity';
import { DatabaseUserRepository } from './database-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, UserEntity])],
  providers: [DatabaseTodoRepository, DatabaseUserRepository],
  exports: [TypeOrmModule, DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
