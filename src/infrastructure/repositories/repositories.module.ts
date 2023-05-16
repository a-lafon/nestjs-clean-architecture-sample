import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { DatabaseTodoRepository } from './database-todo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [DatabaseTodoRepository],
  exports: [TypeOrmModule, DatabaseTodoRepository],
})
export class RepositoriesModule {}
