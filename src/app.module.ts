import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { DbModule } from './infrastructure/database/db.module';
import { BcryptModule } from './infrastructure/external/bcrypt/bcrypt.module';
import { JwtModule } from './infrastructure/external/jwt/jwt.module';

@Module({
  imports: [DbModule, BcryptModule, JwtModule, PresentationModule],
})
export class AppModule {}
