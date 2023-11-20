import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { IBcryptService } from '../../../domain/adapters/bcrypt.interface';

const bcryptServiceProvider = {
  provide: IBcryptService,
  useClass: BcryptService,
};

@Module({
  providers: [bcryptServiceProvider],
  exports: [bcryptServiceProvider],
})
export class BcryptModule {}
