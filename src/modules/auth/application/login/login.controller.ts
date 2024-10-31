import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody } from './login.request-body';
import { LoginResponse } from './login.response';

@Controller('auth')
export class LoginController {
  @Post('/login')
  post(@Body() body: LoginRequestBody): LoginResponse {
    return;
  }
}
