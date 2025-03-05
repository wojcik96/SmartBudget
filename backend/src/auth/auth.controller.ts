import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SingInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.userPassword);
  }
}
