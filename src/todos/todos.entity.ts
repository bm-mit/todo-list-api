import { BaseEntity } from '../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TodoBase extends BaseEntity {
  @Expose({ name: 'user_id' })
  @ApiProperty({
    name: 'user_id',
    type: Number,
    description: 'Id of the todo owner',
    example: 0,
  })
  user: User;

  @ApiProperty({
    description: 'The title of the todo',
    example: "Todo's title",
  })
  title: string;

  @ApiProperty({
    description: 'The description of the todo',
    example: "Todo's description or body",
  })
  description: string;
}

@Entity('todos')
export class Todo extends TodoBase {
  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
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
