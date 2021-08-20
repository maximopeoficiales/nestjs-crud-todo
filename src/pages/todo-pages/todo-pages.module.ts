import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/api/todo/schemas/todo.schema';
import { TodoService } from 'src/api/todo/todo.service';
import { TodoPagesController } from './todo-pages.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodoPagesController],
  providers: [TodoService]
})
export class TodoPagesModule { }
