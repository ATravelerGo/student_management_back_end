import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express'; // 引入响应对象类型

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    //exception 是抛出的错误
    //host 是next的请求上下文，可以获取请求和响应对象

    //获取response对象
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    //设置要返回的code码
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception.getResponse();
    let message: string;
    if (typeof response === 'string') {
      message = response;
    } else if (typeof response === 'object') {
      message = (response as any).message;
    } else {
      message = '服务器内部错误';
    }

    //统一格式返回前端
    res.status(code).json({
      code,
      message,
      data: null,
    });
  }
}
