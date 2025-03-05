import { IsString } from 'class-validator';

export class SingInDto {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly userPassword: string;
}
