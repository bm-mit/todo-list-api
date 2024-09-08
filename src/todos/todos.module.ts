import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
