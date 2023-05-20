import { Module } from '@nestjs/common';
import { TodoControllerModule } from './todo/todo.module';
import { AuthControllerModule } from './auth/auth.module';

@Module({
  imports: [TodoControllerModule, AuthControllerModule],
})
export class PresentationModule {}
