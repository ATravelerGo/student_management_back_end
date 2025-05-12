import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('upload')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
