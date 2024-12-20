import { Inject, Injectable, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigType, registerAs } from '@nestjs/config';
import Joi from 'joi';

export const loggerSchema = {
  LOG_LEVEL: Joi.string()
    .valid('trace', 'debug', 'info', 'warn', 'error')
    .default('info'),
  // e.g. GET::/health,POST::/network
  LOG_EXCLUDE: Joi.string().optional(),
};

export const loggerConfig = registerAs('logger', () => ({
  level: process.env.LOG_LEVEL,
  exclude: process.env.LOG_EXCLUDE,
}));

@Injectable()
export class LoggerConfig {
  public readonly level: string;
  public readonly exclude: (string | RouteInfo)[];

  constructor(
    @Inject(loggerConfig.KEY)
    config: ConfigType<typeof loggerConfig>,
  ) {
    this.level = config.level;
    this.exclude = (config.exclude || '')
      .split(',')
      .filter((x) => x)
      .map((x) => {
        const [method, path] = x.split('::');

        if (!method || !path) {
          throw new Error(
            `Invalid logger configuration. ${method} and ${path}.`,
          );
        }

        return {
          // eslint-disable-next-line security/detect-object-injection
          method: RequestMethod[method],
          path: path,
        };
      });
  }
}
