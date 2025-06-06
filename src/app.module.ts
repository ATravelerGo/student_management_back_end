import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UploadModule } from './upload/upload.module';
import * as dotenv from 'dotenv';
dotenv.config();

import * as process from 'node:process';

const sqlModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  logger: 'advanced-console',
  database: 'student_information_management',
  synchronize: false, //生产环境设置false 自动同步会修改表结构
  autoLoadEntities: true, //这个和下面的哪个二选一就可以
  // entities: [path.join(__dirname, './**/*.entity{.ts,.js}')],
  extra: {
    //类似于“共享单车” vs “每次造新车”。
    connectionLimit: 10, // 连接池大小
    connectTimeout: 10000, // 连接超时（毫秒）
  },
});

@Module({
  imports: [StudentsModule, sqlModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
