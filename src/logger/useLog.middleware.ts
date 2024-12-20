import { INestApplication } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { loggerRequestMiddleware } from './logger-request.middleware';

export function useLogger(app: INestApplication) {
  app.use(loggerRequestMiddleware);
  app.useLogger(app.get(Logger));
}
