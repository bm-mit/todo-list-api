import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'todo-list-api',
      password: 'password',
      database: 'todo-list-api',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    TodosModule,
  ],
  controllers: [TodosController],
  providers: [],
})
export class AppModule {}
