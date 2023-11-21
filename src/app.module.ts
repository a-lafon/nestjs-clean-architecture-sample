import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { LoggerMiddleware } from './infrastructure/middlewares/logger.middleware';

@Module({
  imports: [PresentationModule, InfrastructureModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
