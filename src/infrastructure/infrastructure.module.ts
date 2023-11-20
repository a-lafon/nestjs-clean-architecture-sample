import { Module } from '@nestjs/common';
import { DbModule } from './database/db.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { DocModule } from './doc/doc.module';

@Module({
  imports: [DbModule, ExceptionsModule, DocModule],
})
export class InfrastructureModule {}
