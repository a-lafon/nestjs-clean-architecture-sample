import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILoggerService } from '../../domain/adapters/logger.interface';

const loggerServiceProvider = {
  provide: ILoggerService,
  useClass: LoggerService,
};

@Module({
  providers: [loggerServiceProvider],
  exports: [loggerServiceProvider],
})
export class LoggerModule {}
