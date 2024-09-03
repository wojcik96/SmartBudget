import { Injectable } from '@angular/core';

import { CategoryService } from './category-list/category.service';

import { Transaction } from './transaction-list/model/transaction.model';
import { TransactionType } from './transaction-list/model/transaction-type.enum';
import { Categories } from '../../shared/model/category.enum';
import { loadDataFromLS, saveDataToLS } from '../../shared/utils/localStorage';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private TRANSACTION_LIST_KEY = 'SmBu-TraLis';
  private transactionSummaryList = loadDataFromLS(this.TRANSACTION_LIST_KEY) || [];

  constructor(private categoryService: CategoryService) {}

  getAllTransaction(): Transaction[] {
    return this.transactionSummaryList;
  }

  addTransaction(data: Transaction) {
    data.amount = this.calculateAmount(data.amount, data.type);
    this.transactionSummaryList.push(data);
    this.categoryService.updateCategoryAmount(data.categoryId, data.amount);
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSummaryList);
  }

  private calculateAmount(amount: number, type: TransactionType): number {
    return type === TransactionType.Expense
      ? -Math.abs(amount)
      : Math.abs(amount);
  }
}
