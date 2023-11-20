import { Global, Module } from '@nestjs/common';
import { RegisterUsecase } from './register.usecase';
import { LoginUsecase } from './login.usecase';
import { IsAuthenticatedUsecase } from './is-authenticated';
import { JwtModule } from '../../infrastructure/external/jwt/jwt.module';
import { BcryptModule } from '../../infrastructure/external/bcrypt/bcrypt.module';

@Global()
@Module({
  imports: [JwtModule, BcryptModule],
  providers: [RegisterUsecase, LoginUsecase, IsAuthenticatedUsecase],
  exports: [RegisterUsecase, LoginUsecase, IsAuthenticatedUsecase],
})
export class AuthUseCaseModule {}
