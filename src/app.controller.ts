import { Controller, Get, HttpException, HttpStatus, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './todo/schemas/todo.schema';
import { TodoService } from './todo/todo.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly todoService: TodoService,
  ) { }

  @Get("todoAll")
  async getHello(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  // ejemplo de manejo de errores
  @Get("error")
  async getError() {
    // de esta manera se pueden enviar errores y mensajes
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
      msg: 'Other message',
    }, HttpStatus.FORBIDDEN);
  }

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
