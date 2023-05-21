import { Inject, Injectable } from '@nestjs/common';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { UserRepository } from '../../domain/repositories/user.repository';
import {
  JWT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../infrastructure/constants';

@Injectable()
export class IsAuthenticatedUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
  ) {}

  async exec(token: string): Promise<boolean> {
    const payload = await this.jwtService.verify(token);
    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      return false;
    }

    return true;
  }
}
