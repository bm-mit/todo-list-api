import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { User } from '../users/users.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto, user: User) {
    const todo = {
      ...createTodoDto,
      user,
    };

    return this.todoRepository.save(todo);
  }
}
