import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ILoggerService } from '../../domain/adapters/logger.interface';
import { format } from 'util';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(ILoggerService) private readonly loggerService: ILoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log('headers', format('%o', req.headers));
    this.loggerService.log('body', format('%o', req.body));

    res.on('finish', () => {
      this.loggerService.log(
        `${req.method} ${req.originalUrl} ${req.statusCode} ${res.get(
          'content-length',
        )} - ${req.get('user-agent')} ${req.ip}`,
        '',
      );
    });

    next();
  }
}
