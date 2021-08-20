import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { configMongoose, configTypeORM } from './config';
import { RouterApiModule } from './router/router.api.module';

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [
    MongooseModule.forRoot(configMongoose.uri, configMongoose.options), TypeOrmModule.forRootAsync(configTypeORM), RouterApiModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) { }

}
