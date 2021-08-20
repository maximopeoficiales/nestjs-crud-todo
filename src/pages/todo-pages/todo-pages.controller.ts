import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { CreateTodoDto } from 'src/api/todo/dto/create-todo.dto';
import { Todo } from 'src/api/todo/entities/todo.entity';
import { TodoService } from 'src/api/todo/todo.service';


@Controller()
export class TodoPagesController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @Render('todo/index')
  async todoHtml() {
    return { todos: await this.todoService.findAll(), title: "Lista de Todos" };
  }
  @Post()
  async create(@Body() todo: Todo) {
    return await this.todoService.create(todo);
  }

  @Get(':id')
  @Render('todo/edit')
  async findOne(@Param('id') id: string) {
    const todo = await this.todoService.findOne(id);
    return { todo, title: `Todo: ${todo.title}` };
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<ResponseCustom> {
  //   return await this.todoService.update(id, updateTodoDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string): Promise<ResponseCustom> {
  //   return await this.todoService.remove(id);
  // }
}
