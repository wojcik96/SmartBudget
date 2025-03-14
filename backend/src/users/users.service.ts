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
import { JwtUser } from 'src/auth/models/jwt-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const existUser = await this.userRepo
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

    const user = this.userRepo.create(createUserDto);

    await this.userRepo.save(user);

    return user;
  }
 
  async getUserByLogin(login: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ login });

    if (!user) throw new NotFoundException(`User with ${login} not found`);

    return user;
  }

   async getUserFromJwt(jwtUser: JwtUser): Promise<User> {
    return this.userRepo.findOneBy({ id: jwtUser.sub });
  }
}
