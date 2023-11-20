export interface IExceptionService {
  badRequestException(message?: string): void;
  forbiddenException(message?: string): void;
  notFoundException(message?: string): void;
  unauthorizedException(message?: string): void;
}

export const IExceptionService = Symbol('IExceptionService');
