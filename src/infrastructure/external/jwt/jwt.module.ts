import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import * as jwt from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true,
    }),
    jwt.JwtModule.register({
      global: true,
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
