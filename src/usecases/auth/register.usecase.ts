import { Inject, Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { User } from 'src/domain/model/user.model';
import { UserRepository } from 'src/domain/repositories/user.repository';
import {
  BCRYPT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/infrastructure/constants';

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
