import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { configMongoose, configTypeORM } from './config/config.options';
import { RouterPagesModule } from './routers/api.pages.module';
import { RouterApiModule } from './routers/api.router.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from './config/config.service';
import { Config } from './config/config.key';
import { ConfigModule } from './config/config.module';

@Module({
  // se configura los modulos hijos y la conexion global
  imports: [
    ConfigModule,
    MongooseModule.forRoot(configMongoose.uri, configMongoose.options), TypeOrmModule.forRootAsync(configTypeORM), RouterApiModule, RouterPagesModule, AuthModule, UsersModule
  ]
})
export class AppModule {
  static port: number | string;

  constructor(private connection: Connection, private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Config.PORT);
  }

}
