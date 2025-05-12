import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  @InjectRepository(Upload)
  private uploadRepository: Repository<Upload>;

  create(createUploadDto: CreateUploadDto) {
    const entity = this.uploadRepository.create(createUploadDto);

    return this.uploadRepository.save(entity);
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
