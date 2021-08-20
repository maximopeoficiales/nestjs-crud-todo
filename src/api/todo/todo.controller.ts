import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Render, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Todo } from './entities/todo.entity';
import { ResponseCustom } from 'src/api/types/ResponseCustom';
import { Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Todo } from './schemas/todo.schema';

// asi se puede implementar el versionado del api
@Controller(
  // { version: "1" }
)
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: "Return List todos", isArray: true, type: CreateTodoDto })
  @Get("all")
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<ResponseCustom> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseCustom> {
    return await this.todoService.remove(id);
  }

  @Get()
  @Render('todo/index')
  async todoHtml() {
    return { todos: await this.todoService.findAll(), title: "Lista de Todos" };
  }
}
