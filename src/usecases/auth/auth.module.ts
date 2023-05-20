import { Global, Module } from '@nestjs/common';
import { RegisterUsecase } from './register.usecase';
import {
  BCRYPT_SERVICE_TOKEN,
  JWT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/infrastructure/constants';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/database-user.repository';
import { BcryptService } from 'src/infrastructure/external/bcrypt/bcrypt.service';
import { JwtService } from 'src/infrastructure/external/jwt/jwt.service';
import { LoginUsecase } from './login.usecase';
import { IsAuthenticatedUsecase } from './is-authenticated';

@Global()
@Module({
  providers: [
    RegisterUsecase,
    LoginUsecase,
    IsAuthenticatedUsecase,
    { provide: USER_REPOSITORY_TOKEN, useClass: DatabaseUserRepository },
    { provide: BCRYPT_SERVICE_TOKEN, useClass: BcryptService },
    { provide: JWT_SERVICE_TOKEN, useClass: JwtService },
  ],
  exports: [RegisterUsecase, LoginUsecase, IsAuthenticatedUsecase],
})
export class AuthUseCaseModule {}
