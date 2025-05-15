import { IsString } from 'class-validator';

export class CreateStudentDto {
  name: string;
  gender: string;
  birthday: string;
  address: string;

  @IsString()
  guardian: string;
  guardianPhone: string;
}
