import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
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
};
