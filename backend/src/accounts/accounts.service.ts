import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { JwtUser } from 'src/auth/models/jwt-user';
import { UsersService } from 'src/users/users.service';
import { TransactionType } from 'src/transactions/models/transaction.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createAccountDto: CreateAccountDto,
    jwtUser: JwtUser,
  ): Promise<Account[]> {
    const user = await this.userService.getUserFromJwt(jwtUser);
    const account = this.accountRepo.create({
      ...createAccountDto,
      user,
    });
    await this.accountRepo.save(account);

    return this.getAll(jwtUser);
  }

  // TODO: AddUpData method

  async remove(id: string): Promise<void> {
    await this.accountRepo.delete(id);
  }

  async getAll(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.userService.getUserFromJwt(jwtUser);

    return await this.accountRepo.find({
      where: { user },
    });
  }

  async updateAccountBalance(
    accountId: string,
    amount: number,
    type: TransactionType,
    operation: 'add' | 'subtract'
  ): Promise<void> {
    const account = await this.accountRepo.findOneBy({ id: accountId });
  
    if (!account) {
      throw new Error('Account not found');
    }
  
    const currentBalance = Number(account.balance);
    const modifier = operation === 'add' ? 1 : -1;
    const newBalance =
      type === TransactionType.INCOME
        ? currentBalance + modifier * amount
        : currentBalance - modifier * amount;
  
    await this.accountRepo.update(accountId, { balance: newBalance });
  }
}
