import { IsString, IsNumber, IsEnum, IsDate } from 'class-validator';
import { TransactionType } from '../models/transaction.model';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsString()
  accountId: string;

  @IsString()
  accountName: string;

  @IsDate()
  date: string;

  @IsString()
  categoryLabel: string;

  @IsString()
  categoryId: string;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  userId: string;
}
