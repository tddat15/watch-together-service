import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'dat_thai',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Dat@1234',
  })
  @IsString()
  password: string;
}
