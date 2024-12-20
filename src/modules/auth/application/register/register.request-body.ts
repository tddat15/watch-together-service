import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterRequestBody {
  @ApiProperty({
    example: 'dat_thai',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Dat@123',
  })
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'dat@gmail.com',
  })
  @IsEmail()
  email: string;
}
