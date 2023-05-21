import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { DbModule } from './infrastructure/database/db.module';
import { BcryptModule } from './infrastructure/external/bcrypt/bcrypt.module';
import { JwtModule } from './infrastructure/external/jwt/jwt.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    DbModule,
    BcryptModule,
    JwtModule,
    ExceptionsModule,
    PresentationModule,
  ],
})
export class AppModule {}
