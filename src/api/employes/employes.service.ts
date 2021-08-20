import { Injectable } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';

@Injectable()
export class EmployesService {
  create(createEmployeDto: CreateEmployeDto) {
    return 'This action adds a new employe';
  }

  findAll(search?: string, _limit?: number) {
    if (search) {
      return `Search employe by '${search}'`;

    }
    return `This action returns all employes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employe`;
  }

  update(id: number, updateEmployeDto: UpdateEmployeDto) {
    return `This action updates a #${id} employe`;
  }

  remove(id: number) {
    return `This action removes a #${id} employe`;
  }

  searchByName(search: string) {
    return `Buscando empleados por ${search}`;
  }
}
