import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const existUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: createUserDto.email })
      .select(['user.id'])
      .getOne();

    if (existUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }
  // TODO: Zamienić name na coś co oznacza login
  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ login });

    if (!user) throw new NotFoundException(`User with ${login} not found`);

    return user;
  }

  public viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
