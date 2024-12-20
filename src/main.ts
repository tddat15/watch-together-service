import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger as PinoLogger } from 'nestjs-pino';
import { loggerRequestMiddleware } from './logger/logger-request.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.use(loggerRequestMiddleware);
  app.useLogger(app.get(PinoLogger));

  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

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

  Logger.log('Access swagger at http://localhost:3001/swagger');
  await app.listen(3001);
}
bootstrap().then(() => {
  new Logger('Bootstrap').log('Server running on port 3001');
});
