import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import Joi from 'joi';

export const apiSchema = {
  API_PREFIX: Joi.string().default('mg-hipop-svc'),
  API_VERSION: Joi.string().default('v1'),
};

export const apiConfig = registerAs('api', () => ({
  prefix: process.env.API_PREFIX,
  version: process.env.API_VERSION,
}));

@Injectable()
export class ApiConfig {
  public readonly prefix: string;
  public readonly version: string;

  constructor(
    @Inject(apiConfig.KEY)
    config: ConfigType<typeof apiConfig>,
  ) {
    this.prefix = config.prefix;
    this.version = config.version;
  }
}
