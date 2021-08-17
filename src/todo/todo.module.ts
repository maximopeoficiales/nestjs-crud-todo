import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  // se importa el esquema en todo el modulo
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoService],
  // exporto el servicio para que pueda ser inyectado en todo aquel que importe este modulo
  exports: [TodoService]
})
export class TodoModule implements NestModule {
  // se esta configurando el uso de middleware LoggerMiddleware para todos los endpoints 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("/");
  }


}
