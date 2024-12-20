import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { DatabaseModule } from '@db';
// import { LoggerModule } from './logger';
// import { LoggerMiddleware } from './utils/logger.middleware';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [AuthModule, DatabaseModule, LoggerModule],
})
export class AppModule {}
//   implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply to all routes
//   }
// }
