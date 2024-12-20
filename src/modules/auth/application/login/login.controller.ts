import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody } from './login.request-body';
import { LoginResponse } from './login.response';
import { LoginHandler } from './login.handler';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginHandler: LoginHandler) {}
  @Post('/login')
  async post(@Body() body: LoginRequestBody): Promise<LoginResponse> {
    return await this.loginHandler.login(body);
  }
}
