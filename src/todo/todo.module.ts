import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  // se importa el esquema en todo el modulo
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
  // exporto el servicio para que pueda ser inyectado en todo aquel que importe este modulo
  exports: [TodoService]
})
export class TodoModule { }
