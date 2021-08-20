import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as hbs from 'hbs';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // uso de estaticos y servidor con paginas
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
 

  // pipe validador global con ValidationPipe de nest js
  app.useGlobalPipes(new ValidationPipe());

  // cors global
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  // config swagger
  const options = new DocumentBuilder()
    .setTitle("API Nest js")
    .setDescription("Introduction in Nest Js")
    .setVersion("1.0")
    .addTag("API")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document, {
    explorer: true,
    swaggerOptions: { filter: true, showRequestDuration: true }
  });

  await app.listen(3000);
}
bootstrap();
