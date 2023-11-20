import { Inject, Injectable } from '@nestjs/common';
import { IJwtService } from '../../domain/adapters/jwt.interface';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class IsAuthenticatedUsecase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(IJwtService)
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
