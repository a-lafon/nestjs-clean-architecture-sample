import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IExceptionService } from 'src/domain/adapters/exception.interface';

@Injectable()
export class ExceptionsService implements IExceptionService {
  badRequestException(message?: string): void {
    throw new BadRequestException(message);
  }
  forbiddenException(message?: string): void {
    throw new ForbiddenException(message);
  }
  notFoundException(message?: string): void {
    throw new NotFoundException(message);
  }
  unauthorizedException(message?: string): void {
    throw new UnauthorizedException(message);
  }
}
