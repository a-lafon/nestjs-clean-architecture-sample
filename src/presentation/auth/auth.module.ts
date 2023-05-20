import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthUseCaseModule } from 'src/usecases/auth/auth.module';

@Module({
  imports: [AuthUseCaseModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
