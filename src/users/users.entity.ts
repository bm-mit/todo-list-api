import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Exclude, Transform } from 'class-transformer';
import { Todo } from '../todos/todos.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiResponseProperty()
  name: string;

  @Column({ unique: true })
  @ApiResponseProperty()
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
