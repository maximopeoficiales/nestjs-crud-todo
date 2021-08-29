import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as hbs from 'hbs';
import { optionsCors, optionsCustomSwagger, optionsSwagger } from './config/config.options';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // uso de estaticos y servidor con paginas
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', '/views/partials'));


  // pipe validador global con ValidationPipe de nest js
  app.useGlobalPipes(new ValidationPipe());
  // versionamiento
  app.enableVersioning()
  // cors global
  app.enableCors(optionsCors);
  // config swagger

  const document = SwaggerModule.createDocument(app, optionsSwagger);
  SwaggerModule.setup("api/docs", app, document, optionsCustomSwagger);

  await app.listen(AppModule.port);
}
bootstrap();
