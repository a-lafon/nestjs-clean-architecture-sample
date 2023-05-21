import { Inject, Injectable } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { IExceptionService } from '../../domain/adapters/exception.interface';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { UserRepository } from '../../domain/repositories/user.repository';
import {
  BCRYPT_SERVICE_TOKEN,
  EXCEPTION_SERVICE_TOKEN,
  JWT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../infrastructure/constants';

@Injectable()
export class LoginUsecase {
  private readonly tokenType = 'Bearer';
  private readonly accessTokenExpireIn = '1h';
  private readonly refreshTokenExpireIn = '1d';

  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(BCRYPT_SERVICE_TOKEN)
    private readonly bcryptService: IBcryptService,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
    @Inject(EXCEPTION_SERVICE_TOKEN)
    private readonly exceptionService: IExceptionService,
  ) {}

  async exec(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return this.exceptionService.unauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return this.exceptionService.unauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.accessTokenExpireIn },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.refreshTokenExpireIn },
    );

    return {
      token_type: this.tokenType,
      expiresIn: this.accessTokenExpireIn,
      accessToken,
      refreshToken,
    };
  }
}
