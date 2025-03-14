import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    return this.transactionsService.createTransaction(
      createTransactionDto,
      request['user'],
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('update')
  async updateTransaction(
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() request: Request,
  ) {
    return this.transactionsService.updateTransaction(
      updateTransactionDto,
      request['user'],
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAllTransactions')
  public async getAllTransactions(
    @Req() request: Request,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getAllTransactions(request['user']);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('remove/:transactionId')
  public async removeTransaction(
    @Param('transactionId') id: string,
    @Req() request: Request,
  ): Promise<Transaction[]> {
    await this.transactionsService.removeTransaction(id);

    return this.transactionsService.getAllTransactions(request['user']);
  }
}
