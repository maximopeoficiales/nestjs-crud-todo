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

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [TodoModule, MongooseModule.forRoot('mongodb://localhost/todoApp', {
    useNewUrlParser: true
  }), TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  }), EmployesModule, ProductsModule],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }

}
