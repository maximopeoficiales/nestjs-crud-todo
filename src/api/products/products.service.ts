import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // inyecto mi repository Product
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productsRepository.findOneOrFail(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findOneOrFail(id);
    this.productsRepository.merge(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: number): Promise<boolean> {
    let result = (await this.productsRepository.delete(id));
    return result.affected == 0 ? false : true;
  }
}
