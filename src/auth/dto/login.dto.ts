import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserBase } from '../../users/users.entity';

export class LoginDto extends PickType(UserBase, [
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "User's password" })
  password: string;
}
