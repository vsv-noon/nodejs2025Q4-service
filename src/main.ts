import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;
  const logger = app.get(LoggingService);

  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', { reason });
    process.exit(1);
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('REST Service')
    .setDescription(
      'Home Library Service. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library.',
    )
    .setVersion('1.0')
    .addTag('Home Library Service')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const yamlString: string = yaml.dump(document);
  fs.writeFileSync('./doc/api.yaml', yamlString);

  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}
bootstrap();
