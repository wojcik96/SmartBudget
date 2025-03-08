import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByLogin(name);
    const isValidPass = await bcrypt.compare(pass, user.password);

    if (!isValidPass) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.login, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
