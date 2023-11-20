import { Injectable } from '@nestjs/common';
import {
  IJwtService,
  JwtOptions,
} from '../../../domain/adapters/jwt.interface';
import * as jwt from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;

  constructor(
    private readonly jwtService: jwt.JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.getOrThrow<string>('jwt.secret');
  }

  sign(payload: object, options?: JwtOptions): string {
    return this.jwtService.sign(payload, {
      expiresIn: options.expiresIn,
      secret: this.secret,
    });
  }

  async verify<T extends object = any>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token, {
      secret: this.secret,
    });
  }
}
