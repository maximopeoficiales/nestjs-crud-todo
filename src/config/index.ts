import { MongooseModuleOptions } from "@nestjs/mongoose";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";

type ConfigMongoose = {
    uri: string,
    options?: MongooseModuleOptions
}

export const configMongoose: ConfigMongoose = {
    uri: 'mongodb://localhost/todoApp',
    options: {
        useNewUrlParser: true
    }
}

export const configTypeORM: TypeOrmModuleAsyncOptions = {
    useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
            autoLoadEntities: true,
        }),
}