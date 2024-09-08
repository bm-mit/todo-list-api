import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/users.entity';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    return new User(await this.usersService.create(registerDto));
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
