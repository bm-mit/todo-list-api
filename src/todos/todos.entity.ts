import { BaseEntity } from '../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Expose, Transform } from 'class-transformer';

@Entity('todos')
export class Todo extends BaseEntity {
  @ManyToOne(() => User, (user) => user.todos)
  @Expose({ name: 'user_id' })
  @Transform(({ value }) => value.id)
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  constructor(partial: Partial<Todo>) {
    super();
    Object.assign(this, partial);
  }
}
