import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IsAuthenticatedUsecase } from 'src/usecases/auth/is-authenticated';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly isAuthenticatedUsecase: IsAuthenticatedUsecase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        return false;
      }

      return await this.isAuthenticatedUsecase.exec(token);
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
