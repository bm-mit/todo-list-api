import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const foundUser = await this.usersService.findOne(loginDto.email);
    this.validatePassword(loginDto.password, foundUser);

    return { token: this.generateJwtToken(foundUser) };
  }

  validatePassword(password: string, user: User) {
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid email or password');
  }

  generateJwtToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
