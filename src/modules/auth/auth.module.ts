import { Module } from '@nestjs/common';
import * as useCases from './application';
import * as service from './service';
import { DatabaseModule } from '@db';
import { LoggerModule } from '../../logger/logger.module';

const applications = Object.values(useCases);
const controllers = applications.filter((x) => x.name.endsWith('Controller'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));
const services = Object.values(service).filter((x) =>
  x.name.endsWith('Service'),
);

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [...controllers],
  providers: [...handlers, ...services],
  exports: [...services],
})
export class AuthModule {}
