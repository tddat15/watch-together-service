import { Module } from '@nestjs/common';
import { LoginController } from './application/login/login.controller';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [],
  exports: [],
})
export class AuthModule {}
