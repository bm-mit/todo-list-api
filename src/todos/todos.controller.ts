import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { User } from '../users/users.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Todo } from './todos.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiNotFoundResponse({
  description: 'Todo not found or not owned by the user',
})
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get all todos of the user',
    parameters: [
      {
        in: 'query',
        name: 'page',
        description: 'Page number',
        required: false,
        example: 1,
      },
      {
        in: 'query',
        name: 'limit',
        description: 'Number of todos per page',
        required: false,
        example: 10,
      },
    ],
  })
  @ApiOkResponse({ isArray: true, type: Todo })
  findAll(
    @Req() { user }: { user: User },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.todosService.findAllByUser(user, page, limit);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiCreatedResponse({
    type: Todo,
    description: 'Todo created',
  })
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() { user }: { user: User },
  ) {
    return new Todo(await this.todosService.create(createTodoDto, user));
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a todo' })
  @ApiOkResponse({
    type: Todo,
    description: 'Todo updated',
  })
  async update(
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ) {
    return new Todo(await this.todosService.update(user, id, updateTodoDto));
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiNoContentResponse({ description: 'Todo deleted' })
  async delete(@Req() { user }: { user: User }, @Param('id') id: number) {
    await this.todosService.delete(user, id);
  }
}
