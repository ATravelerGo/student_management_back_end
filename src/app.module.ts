import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //让 ConfigService 在任何模块中都可用（推荐）
      envFilePath: ['.env'], //默认就是 .env，指定也可以是 `.env.${process.env.NODE_ENV}`
    }),
    StudentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          logging: false,
          logger: 'advanced-console',
          database: 'student_information_management',
          synchronize: true, //生产环境设置false 自动同步会修改表结构
          autoLoadEntities: true, //这个和下面的哪个二选一就可以
          // entities: [path.join(__dirname, './**/*.entity{.ts,.js}')],
          extra: {
            //类似于“共享单车” vs “每次造新车”。
            connectionLimit: 10, // 连接池大小
            connectTimeout: 10000, // 连接超时（毫秒）
          },
        };
      },
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
