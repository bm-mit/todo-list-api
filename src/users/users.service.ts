import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    await this.validateEmail(registerDto.email);

    const hashedPassword = this.generateHashedPassword(registerDto.password);

    return this.userRepository.save({
      ...registerDto,
      password: hashedPassword,
    });
  }

  async validateEmail(email: string) {
    if (await this.findOne(email))
      throw new ConflictException('Email already exists');
  }

  generateHashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async findOne(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
