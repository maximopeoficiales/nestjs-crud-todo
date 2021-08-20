import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, HttpStatus, Query, DefaultValuePipe, ParseBoolPipe, HttpException, UseInterceptors, UploadedFile, UploadedFiles, Res, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Put } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  // uso de pipes para valores y validaciones por defecto
  @Get("all")
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get()
  async findAllCustom(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return { activeOnly, page, data: await this.productsService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Product> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error,
        msg: `El producto con id: ${id} no existe`,
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error,
        msg: `El producto con id: ${id} no existe`,
      }, HttpStatus.NOT_FOUND);
    }
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    let result = await this.productsService.remove(id);
    if (!result) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "",
        msg: `El producto con id: ${id} no existe`,
      }, HttpStatus.NOT_FOUND);

    }
  }

  // este filtro subira las imagenes
  /* @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  })) */
  // la implementacion se hizo a nivel de modulo por defecto
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  // lee la imagen guardada en files por el metodo post
  @Get('uploads/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './files' });
  }


  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }

  // AnyFilesInterceptor() usar este interceptor cuando quieres que acepte cualquier tipo de clave
  @Post('uploadsFields')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadFilesFields(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }

}
