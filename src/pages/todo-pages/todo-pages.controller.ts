import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect } from '@nestjs/common';
import { CreateTodoDto } from 'src/api/todo/dto/create-todo.dto';
import { Todo } from 'src/api/todo/entities/todo.entity';
import { TodoDocument } from 'src/api/todo/schemas/todo.schema';
import { TodoService } from 'src/api/todo/todo.service';


@Controller()
export class TodoPagesController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @Render('todo/index')
  async todoIndex() {
    return { todos: await this.todoService.findAll(), title: "Lista de Todos" };
  }

  // @Redirect("../")
  @Get("create")
  @Render('todo/edit')
  async create() {
    return { todo: new Todo() };
  }

  @Redirect("./")
  @Post()
  async update(@Body() todo: TodoDocument) {

    if (todo._id !== "") {
      // actualiza
      await this.todoService.update(todo._id, todo);
    } else {
      delete todo._id;
      await this.todoService.create(todo);
    }
  }

  @Get(':id')
  @Render('todo/edit')
  async findOne(@Param('id') id: string) {
    const todo = await this.todoService.findOne(id);
    return { todo, title: `Todo: ${todo.title}` };
  }


  @Redirect("../")
  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    console.log("estoy usando; ", id);

    return await this.todoService.remove(id);
  }
}
