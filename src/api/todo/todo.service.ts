import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseCustom } from 'src/api/types/ResponseCustom';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  // inyeccion de depencia  para obtener la instancia de TOdo
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    // console.log(createdTodo);

    return await createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<ResponseCustom> {
    try {
      await this.todoModel.findByIdAndUpdate(id, updateTodoDto).exec();
      return { msg: `Todo ${id} actualizado correctamente` };
    } catch (error) {
      return { msg: `Todo ${id} no existe` };
    }

  }

  async remove(id: string): Promise<ResponseCustom> {
    let resp = await this.todoModel.findByIdAndRemove(id).exec();
    if (resp) {
      return { msg: `Todo ${id} eliminado correctamente` };
    } else {
      return { msg: `Todo ${id} no existe` };
    }
  }
}
