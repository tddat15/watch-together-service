import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty({
    example: 'dat_thai',
  })
  username: string;
}
