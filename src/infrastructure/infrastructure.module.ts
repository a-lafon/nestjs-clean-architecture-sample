import { Module } from '@nestjs/common';
import { DbModule } from './database/db.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { DocModule } from './doc/doc.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DbModule, ExceptionsModule, DocModule, LoggerModule],
  exports: [LoggerModule],
})
export class InfrastructureModule {}
