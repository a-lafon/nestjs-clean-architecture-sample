import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [PresentationModule, InfrastructureModule],
})
export class AppModule {}
