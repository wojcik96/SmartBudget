import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget, Category, Account, User, Transaction]),
    CategoriesModule,
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService, UsersService],
})
export class BudgetsModule {}
