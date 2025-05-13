import {
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import * as path from 'path';
import { ResponseHelper } from '../common/response.helper';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import e, { Express } from 'express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.resolve('D:\\testUpload'),
        filename: (req, file, cb) => {
          //如果你没有设置 filename，Multer 会自动为文件生成一个默认的文件名，通常是一个随机的字符串。如果没有明确指定文件名，可能会导致文件保存时没有扩展名，或扩展名不正确。
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = file.path;

    const data = await this.uploadService.create({ url });
    //这个return千万不能丢
    return ResponseHelper.success(data, '成功啦');
  }
}
