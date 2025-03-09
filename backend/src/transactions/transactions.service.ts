import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtUser } from 'src/auth/models/jwt-user';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { log } from 'console';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async getUserFromJwt(jwtUser: JwtUser): Promise<User> {
    return this.userRepository.findOneBy({ id: jwtUser.sub });
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    userJwt: JwtUser,
  ): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(userJwt);
    
    const transaction = this.transactionRepository.create({
      name: createTransactionDto.name,
      amount: createTransactionDto.amount,
      accountId: createTransactionDto.accountId,
      accountName: createTransactionDto.accountName,
      date: createTransactionDto.date,
      categoryLabel: createTransactionDto.categoryLabel,
      categoryId: createTransactionDto.categoryId,
      type: createTransactionDto.type,
      user,
    });
    
    await this.transactionRepository.save(transaction);
    return this.getAllTransactions(userJwt);
  }

  async updateTransaction(
    transactionData: UpdateTransactionDto,
    jwtUser: JwtUser,
  ): Promise<Transaction[]> {
    await this.transactionRepository.update(transactionData.id, transactionData);
    return this.getAllTransactions(jwtUser);
  }

  async removeTransaction(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async getAllTransactions(jwtUser: JwtUser): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(jwtUser);
    return this.transactionRepository.find({
      where: { user },
      relations: ['user'],
      order: {
        date: 'DESC'
      }
    });
  }

  async getCategoryExpenses(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.getUserFromJwt(jwtUser);
    const transactions = await this.transactionRepository.find({
      where: { user },
    });

    return transactions.reduce((acc, transaction) => {
      const categoryId = transaction.categoryId;
      const amount = Number(transaction.amount);

      if (isNaN(amount)) return acc;

      const existingCategory = acc.find(
        (item) => item.categoryId === categoryId,
      );
      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        acc.push({ categoryId, amount });
      }

      return acc;
    }, []);
  }
}
