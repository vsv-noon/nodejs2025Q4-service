import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Login cannot be empty ' })
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
