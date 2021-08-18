import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { EmployesModule } from './employes/employes.module';
import { ProductsModule } from './products/products.module';

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [TodoModule, MongooseModule.forRoot('mongodb://localhost/todoApp', {
    useNewUrlParser: true
  }), EmployesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
