import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier in the database' })
  id: number;

  @CreateDateColumn()
  @Expose({ name: 'created_at' })
  @ApiProperty({
    name: 'created_at',
    description: 'The time when the entity was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose({ name: 'updated_at' })
  @ApiProperty({
    name: 'updated_at',
    description: 'The time when the entity was updated',
  })
  updatedAt: Date;
}
