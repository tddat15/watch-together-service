import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle('Watch Together')
    .setDescription('The Watch Together API description')
    .setVersion('1.0')
    .addTag('Watch Together')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, documentFactory);

  Logger.log('Access swagger at http://localhost:3000/swagger');
  await app.listen(3000);
}
bootstrap().then(() => {
  new Logger('Bootstrap').log('Server running on port 3000');
});
