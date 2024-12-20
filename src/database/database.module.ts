import { Module } from '@nestjs/common';
import { PrismaService } from './services';

@Module({
  imports: [],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class DatabaseModule {}
