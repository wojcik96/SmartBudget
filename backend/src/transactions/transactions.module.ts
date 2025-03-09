import { forwardRef, Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from './entities/transactions.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => CategoriesModule),
    TypeOrmModule.forFeature([Transaction, User]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService, TypeOrmModule],
})
export class TransactionsModule {}
