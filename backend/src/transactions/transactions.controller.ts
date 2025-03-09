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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionFormData } from './models/transaction.model';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtUser } from 'src/auth/models/jwt-user';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('createTransaction')
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto | UpdateTransactionDto,
    @Req() request: Request,
  ) {
    const user = request['user'];
    if (!user) {
      throw new UnauthorizedException('No user found');
    }

    if ((createTransactionDto as UpdateTransactionDto).id) {
      return this.transactionsService.updateTransaction(
        createTransactionDto as UpdateTransactionDto,
        user,
      );
    } else {
      return this.transactionsService.createTransaction(
        createTransactionDto as CreateTransactionDto,
        user,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAllTransactions')
  public async getAllTransactions(
    @Req() request: Request,
  ): Promise<Transaction[]> {
    const user = request['user'];
    return await this.transactionsService.getAllTransactions(user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('remove/:transactionId')
  public async removeTransaction(
    @Param('transactionId') id: string,
    @Req() request: Request,
  ): Promise<Transaction[]> {
    const user = request['user'];

    await this.transactionsService.removeTransaction(id);

    return this.transactionsService.getAllTransactions(user);
  }
}
