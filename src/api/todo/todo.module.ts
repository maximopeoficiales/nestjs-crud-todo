import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/ jwt-auth.guard';

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
      // .forRoutes(TodoController);
      .forRoutes({ path: "/", method: RequestMethod.ALL });
    // .forRoutes("/");
  }


}
