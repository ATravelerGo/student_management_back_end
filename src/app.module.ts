import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //让 ConfigService 在任何模块中都可用（推荐）
      envFilePath: ['.env'], //默认就是 .env，指定也可以是 `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    UploadModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
