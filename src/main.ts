import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用 class-transformer
      // whitelist: true, // 移除未在 DTO 中定义的字段
      // forbidNonWhitelisted: true, // 非白名单字段报错
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
