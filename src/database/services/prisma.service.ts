import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../../prisma/prisma-client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'query' },
      ],
      errorFormat: 'colorless',
    });

    this.$on('query', (e) => {
      this.logger.debug(
        `query: ${e.query}, params: ${e.params}, duration: ${e.duration}ms`,
      );
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
