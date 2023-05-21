import { Inject, Injectable } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { User } from '../../domain/model/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';
import {
  BCRYPT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../../infrastructure/constants';

@Injectable()
export class RegisterUsecase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(BCRYPT_SERVICE_TOKEN)
    private readonly bcryptService: IBcryptService,
  ) {}

  async exec(user: User): Promise<User> {
    user.password = await this.bcryptService.hash(user.password);
    return await this.userRepository.create(user);
  }
}
