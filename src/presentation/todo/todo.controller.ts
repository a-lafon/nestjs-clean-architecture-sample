import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTodoUsecase } from 'src/usecases/todo/create-todo.usecase';
import { GetTodoUsecase } from 'src/usecases/todo/get-todo.usecase';
import { GetTodosUsecase } from 'src/usecases/todo/get-todos.usecase';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo } from 'src/domain/model/todo.model';
import { UpdateTodoUsecase } from 'src/usecases/todo/update-todo.usecase';
import { DeleteTodoUsecase } from 'src/usecases/todo/delete-todo.usecase';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(
    private readonly getTodoUsecase: GetTodoUsecase,
    private readonly getTodosUsecase: GetTodosUsecase,
    private readonly createTodosUsecase: CreateTodoUsecase,
    private readonly updateTodosUsecase: UpdateTodoUsecase,
    private readonly deleteTodosUsecase: DeleteTodoUsecase,
  ) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.getTodoUsecase.exec(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Get()
  async getAll() {
    return await this.getTodosUsecase.exec();
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    const todo = new Todo();
    todo.title = body.title;
    todo.description = body.description;
    todo.isCompleted = false;
    return await this.createTodosUsecase.exec(todo);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto,
  ) {
    const todo = await this.getTodoUsecase.exec(id);
    if (!todo) {
      throw new NotFoundException();
    }
    const newTodo = Object.assign(todo, body);
    return await this.updateTodosUsecase.exec(id, newTodo);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTodosUsecase.exec(id);
  }
}
