import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { DbModule } from './infrastructure/database/db.module';

@Module({
  imports: [DbModule, PresentationModule],
})
export class AppModule {}
