import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { configMongoose, configTypeORM } from './config';
import { RouterPagesModule } from './routers/api.pages.module';
import { RouterApiModule } from './routers/api.router.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [
    MongooseModule.forRoot(configMongoose.uri, configMongoose.options), TypeOrmModule.forRootAsync(configTypeORM), RouterApiModule, RouterPagesModule, AuthModule, UsersModule
  ]
})
export class AppModule {
  constructor(private connection: Connection) { }

}
