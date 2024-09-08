import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty()
  id: number;

  @CreateDateColumn()
  @Expose({ name: 'created_at' })
  @ApiResponseProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose({ name: 'updated_at' })
  @ApiResponseProperty()
  updatedAt: Date;
}
