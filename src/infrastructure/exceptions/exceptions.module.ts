import { Global, Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { IExceptionService } from '../../domain/adapters/exception.interface';

const exceptionServiceProvider = {
  provide: IExceptionService,
  useClass: ExceptionsService,
};

@Global()
@Module({
  providers: [exceptionServiceProvider],
  exports: [exceptionServiceProvider],
})
export class ExceptionsModule {}
