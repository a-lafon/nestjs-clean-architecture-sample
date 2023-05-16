import { Module } from '@nestjs/common';
import { TodoControllerModule } from './todo/todo.module';

@Module({
  imports: [TodoControllerModule],
})
export class PresentationModule {}
