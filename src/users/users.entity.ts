import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Exclude, Transform } from 'class-transformer';
import { Todo } from '../todos/todos.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UserBase extends OmitType(BaseEntity, [
  'createdAt',
  'updatedAt',
] as const) {
  @ApiProperty({ description: "User's name" })
  name: string;

  @ApiProperty({ description: "User's email" })
  email: string;

  @ApiProperty({ description: "User's password" })
  @MinLength(8)
  password: string;
}

@Entity('users')
export class User extends OmitType(UserBase, ['password'] as const) {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  @Transform(({ value }) => value.map((todo: Todo) => todo.id))
  todos: Todo[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
