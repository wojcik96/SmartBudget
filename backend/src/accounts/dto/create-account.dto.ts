import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDate,
} from 'class-validator';
import { AccountType } from '../models/accounts';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  currency: string = 'PLN';

  @IsNumber()
  @IsOptional()
  balance: number = 0;

  @IsEnum(AccountType)
  type: AccountType;

  @IsDate()
  @IsOptional()
  createdAt?: Date = new Date();
}
