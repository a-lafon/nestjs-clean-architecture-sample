import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoUseCaseModule } from 'src/usecases/todo/todo.module';
import { EXCEPTION_SERVICE_TOKEN } from 'src/infrastructure/constants';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

@Module({
  imports: [TodoUseCaseModule],
  providers: [
    { provide: EXCEPTION_SERVICE_TOKEN, useClass: ExceptionsService },
  ],
  controllers: [TodoController],
})
export class TodoControllerModule {}
