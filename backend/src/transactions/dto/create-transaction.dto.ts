import { IsString, IsNumber, IsEnum, IsDate } from 'class-validator';
import { TransactionType } from '../models/transaction.model';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;
  
  @IsDate()
  date: string;
  
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsString()
  accountId: string;

  @IsString()
  categoryId: string;
}
