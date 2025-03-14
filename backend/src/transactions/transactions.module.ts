import { forwardRef, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from './entities/transactions.entity';
import { User } from 'src/users/entities/user.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => CategoriesModule),
    TypeOrmModule.forFeature([Transaction, User, Account, Category]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, AccountsService],
  exports: [TransactionsService, TypeOrmModule],
})
export class TransactionsModule {}
