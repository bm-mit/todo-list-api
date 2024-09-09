import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Todo } from './todos.entity';
import { User } from '../users/users.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

  findAllByUser(user: User, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;
    return this.todoRepository.find({
      where: { user },
      order: { createdAt: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
  }

  async update(
    requestUser: User,
    todoId: number,
    updateTodoDto: UpdateTodoDto,
  ) {
    const todo = await this.findOneAndValidate(requestUser, todoId);

    return this.todoRepository.save({ ...todo, ...updateTodoDto });
  }

  async delete(requestUser: User, todoId: number) {
    await this.findOneAndValidate(requestUser, todoId);

    return this.todoRepository.delete(todoId);
  }

  async findOneAndValidate(requestUser: User, todoId: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        user: requestUser,
      },
    });

    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }
}
