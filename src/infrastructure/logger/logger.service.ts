import { Injectable, Logger } from '@nestjs/common';
import { ILoggerService } from '../../domain/adapters/logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILoggerService {
  log(message: string, context: string): void {
    super.log(message, context);
  }
  debug(message: string, context: string): void {
    super.debug(message, context);
  }
  error(message: string, context: string, trace?: string): void {
    super.error(message, trace, context);
  }
  warn(message: string, context: string): void {
    super.warn(message, context);
  }
}
