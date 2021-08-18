import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductValidationPipe } from './pipes/product-validation.pipe';

@Module({
  // imports:[ProductValidationPipe],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
