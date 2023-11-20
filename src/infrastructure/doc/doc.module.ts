import { Module } from '@nestjs/common';
import { DocService } from './doc.service';

@Module({
  providers: [DocService],
})
export class DocModule {}
