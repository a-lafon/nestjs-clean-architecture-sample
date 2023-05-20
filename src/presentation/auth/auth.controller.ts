import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { RegisterUsecase } from 'src/usecases/auth/register.usecase';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/domain/model/user.model';
import { LoginUsecase } from 'src/usecases/auth/login.usecase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly loginUsecase: LoginUsecase,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = plainToInstance(User, body);
    return this.registerUsecase.exec(user);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.loginUsecase.exec(body.email, body.password);
  }
}
