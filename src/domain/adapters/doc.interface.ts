import { INestApplication } from '@nestjs/common';

export interface IDocService {
  serve(path: string, app: INestApplication): void;
}
