import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionFormData } from './models/transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAllTransactions')
  public getAllTransactions(): Transaction[] {
    return this.transactionsService.getAllTransactions();
  }

  @HttpCode(HttpStatus.OK)
  @Post('addTransaction')
  public addTransaction(@Body() data: TransactionFormData): void {
    this.transactionsService.addTransaction(data);
  }

  @HttpCode(HttpStatus.OK)
  @Put('updateTransaction')
  public updateTransaction(@Body() data: TransactionFormData): void {
    this.transactionsService.updateTransaction(data);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('remove:transactionId')
  public removeTransaction(@Param('transactionId') id: string): void {
    this.transactionsService.removeTransaction(id);
  }
}
