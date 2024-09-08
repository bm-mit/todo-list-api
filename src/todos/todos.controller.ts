import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { User } from '../users/users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Todo } from './todos.entity';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() { user }: { user: User }) {
    throw new NotImplementedException();
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() { user }: { user: User },
  ) {
    return new Todo(await this.todosService.create(createTodoDto, user));
  }
}
