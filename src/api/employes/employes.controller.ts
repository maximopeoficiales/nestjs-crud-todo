import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res, Headers, Header } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('employes')
export class EmployesController {
  constructor(private readonly employesService: EmployesService) { }

  @Post()
  create(@Body() createEmployeDto: CreateEmployeDto) {
    return this.employesService.create(createEmployeDto);
  }

  @Get()
  findAll(@Query("search") search?: string, @Query("_limit") _limit?: number) {

    return this.employesService.findAll(search, _limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDto) {
    return this.employesService.update(+id, updateEmployeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employesService.remove(+id);
  }

  @Post("upload")
  uploadFile(@Req() req: Request, @Res() res: Response, @Headers() header) {
    // console.log(header);

    if (Object.entries(req.body).length !== 0) return res.status(HttpStatus.OK).json(req.body);

    return res.status(HttpStatus.BAD_REQUEST).json(req.body);

  }
 

}
