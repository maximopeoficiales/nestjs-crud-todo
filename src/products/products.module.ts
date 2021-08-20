import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './subcribers/products.subscriber';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './services/multer-config-service';
@Module({
  // se importa la entidad para poder usarla en todo el modulo
  // se esta registrando la ruta donde se guardan los archivos
  imports: [TypeOrmModule.forFeature([Product]), MulterModule.registerAsync({
    useClass: MulterConfigService,
  })],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSubscriber]
})
export class ProductsModule { }
