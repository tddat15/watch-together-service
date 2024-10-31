import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';

@Module({
  imports: [AuthModule],
})
export class AppModule {}
