import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, UsePipes, Query, DefaultValuePipe, ParseBoolPipe, HttpException, } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Put } from '@nestjs/common';


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
}
