import { Inject, Injectable } from '@nestjs/common';
import { IBcryptService } from '../../domain/adapters/bcrypt.interface';
import { User } from '../../domain/model/user.model';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class RegisterUsecase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(IBcryptService)
    private readonly bcryptService: IBcryptService,
  ) {}

  async exec(user: User): Promise<User> {
    user.password = await this.bcryptService.hash(user.password);
    return await this.userRepository.create(user);
  }
}
