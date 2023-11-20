import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import * as jwt from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt.config';
import { IJwtService } from 'src/domain/adapters/jwt.interface';

const jwtServiceProvider = {
  provide: IJwtService,
  useClass: JwtService,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    jwt.JwtModule.register({}),
  ],
  providers: [jwtServiceProvider],
  exports: [jwtServiceProvider],
})
export class JwtModule {}
