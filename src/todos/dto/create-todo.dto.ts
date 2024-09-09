import { IsNotEmpty, IsString } from 'class-validator';
import { TodoBase } from '../todos.entity';
import { PickType } from '@nestjs/swagger';

export class CreateTodoDto extends PickType(TodoBase, [
  'title',
  'description',
] as const) {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
