import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { EmployesModule } from './employes/employes.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, Connection } from 'typeorm';
import { FileController } from './file/file.controller';
import { RouterModule } from '@nestjs/core';
import { TodoController } from './todo/todo.controller';

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [MongooseModule.forRoot('mongodb://localhost/todoApp', {
    useNewUrlParser: true
  }), TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  }), EmployesModule, ProductsModule, TodoModule, RouterModule.register([
    { path: "api", module: TodoModule }
  ])],
  controllers: [AppController, FileController, TodoController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }

}
