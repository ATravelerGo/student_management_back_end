import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express'; // 引入响应对象类型

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    //exception 是抛出的错误
    //host 是next的请求上下文，可以获取请求和响应对象

    //获取response对象
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    //设置要返回的code码
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //设置返回的信息
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : '服务器内部错误';

    //统一格式返回前端
    response.status(code).json({
      code,
      message,
      data: null,
    });
  }
}
