import { INestApplication, Injectable } from '@nestjs/common';
import { IDocService } from '../../domain/adapters/doc.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import project from '../../../package.json';

@Injectable()
export class DocService implements IDocService {
  serve(path: string, app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle(project.name)
      .setDescription(project.description)
      .setVersion(project.version)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
  }
}
