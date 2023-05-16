import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    RepositoriesModule,
  ],
  exports: [RepositoriesModule],
})
export class DbModule {}
