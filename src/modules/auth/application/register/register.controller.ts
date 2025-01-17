import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterRequestBody } from './register.request-body';
import { RegisterResponse } from './register.response';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterHandler } from './register.handler';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerHandler: RegisterHandler) {}

  @ApiOperation({ description: 'Register an account.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/register')
  async post(@Body() body: RegisterRequestBody): Promise<string> {
    return await this.registerHandler.registerAccount(body);
  }
}
