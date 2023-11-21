export interface ILoggerService {
  log(message: string, context: string): void;
  debug(message: string, context: string): void;
  error(message: string, context: string, trace?: string): void;
  warn(message: string, context: string): void;
}

export const ILoggerService = Symbol('ILoggerService');
