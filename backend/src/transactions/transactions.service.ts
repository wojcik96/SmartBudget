import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from 'src/auth/models/jwt-user';
import { Transaction } from './entities/transactions.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Category } from 'src/categories/entities/categories.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionType } from './models/transaction.model';
import { log } from 'console';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly accountsService: AccountsService,
  ) {}

  private async getUserFromJwt(jwtUser: JwtUser): Promise<User> {
    return this.userRepo.findOneBy({ id: jwtUser.sub });
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    userJwt: JwtUser,
  ): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(userJwt);
    const account = await this.accountRepo.findOneBy({
      id: createTransactionDto.accountId,
    });
    const category = await this.categoryRepo.findOneBy({
      id: createTransactionDto.categoryId,
    });

    if (!account) throw new Error('Account not found');
    if (!category) throw new Error('Category not found');

    const transaction = this.transactionRepo.create({
      name: createTransactionDto.name,
      amount: createTransactionDto.amount,
      date: createTransactionDto.date,
      type: createTransactionDto.type,
      category,
      account,
      user,
    });

    await this.transactionRepo.save(transaction);
    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'add',
    );

    return this.getAllTransactions(userJwt);
  }

  async updateTransaction(
    updateTransactionDto: UpdateTransactionDto,
    userJwt: JwtUser,
  ): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(userJwt);
    const account = await this.accountRepo.findOneBy({
      id: updateTransactionDto.accountId,
    });
    const transaction = await this.transactionRepo.findOne({
      where: { id: updateTransactionDto.id, user },
      relations: ['category', 'account'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    await this.accountsService.updateAccountBalance(
      transaction.account.id,
      transaction.amount,
      transaction.type,
      'subtract',
    );
    
    transaction.name = updateTransactionDto.name;
    transaction.amount = updateTransactionDto.amount;
    transaction.date = updateTransactionDto.date;
    transaction.type = updateTransactionDto.type;
    transaction.account = account;

    if (updateTransactionDto.categoryId) {
      transaction.category = await this.categoryRepo.findOne({
        where: { id: updateTransactionDto.categoryId },
      });
    }

    await this.transactionRepo.save(transaction);
    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'add',
    );

    return this.getAllTransactions(userJwt);
  }

  async removeTransaction(id: string): Promise<void> {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['account'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const account = await this.accountRepo.findOneBy({
      id: transaction.account.id,
    });

    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'subtract',
    );

    await this.transactionRepo.delete(id);
  }

  async getAllTransactions(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.getUserFromJwt(jwtUser);

    const transactions = await this.transactionRepo.find({
      where: { user },
      relations: ['category', 'account'],
      order: { date: 'DESC' },
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      categoryId: transaction.category?.id || null,
      categoryLabel: transaction.category?.name || null,
      accountId: transaction.account?.id || null,
      accountLabel: transaction.account?.name || null,
    }));
  }

  async getCategoryExpenses(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.getUserFromJwt(jwtUser);

    const transactions = await this.transactionRepo.find({
      where: { user },
      relations: ['category'],
    });

    return transactions.reduce((acc, transaction) => {
      if (!transaction.category) return acc;

      const categoryId = transaction.category.id;
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
