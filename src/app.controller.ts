import { Controller, Get, Render } from '@nestjs/common';
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

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
