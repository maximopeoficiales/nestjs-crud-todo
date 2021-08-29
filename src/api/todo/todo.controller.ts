import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Render, HttpStatus, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Todo } from './entities/todo.entity';
import { ResponseCustom } from 'src/api/types/ResponseCustom';
import { Put } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './schemas/todo.schema';
import { JwtAuthGuard } from 'src/auth/guards/ jwt-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import { AppModule } from 'src/app.module';

// se agrego guardian en todos los metodos del controlador
// asi se puede implementar el versionado del api
@ApiTags('Todos')
// @ApiHeader({
//   name: 'X-MyHeader',
//   description: 'Custom header',
// })
@UseGuards(JwtAuthGuard)
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
  @Public()
  @Get()
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


}
