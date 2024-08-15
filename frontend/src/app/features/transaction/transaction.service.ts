import { Injectable } from '@angular/core';

import { CategoryService } from './category-list/category.service';

import { Transaction } from './transaction-list/model/transaction.model';
import { TransactionType } from './transaction-list/model/transaction-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private categoryService: CategoryService) {}

  private transactions: Transaction[] = [
    {
      id: 'tra-1',
      createdDate: '',
      date: '2024-08-01',
      title: 'Wynagrodzenie',
      categoryId: 'cat-1',
      categoryName: 'Income',
      amount: 3000,
      type: TransactionType.Income
    },
    {
      id: 'tra-2',
      createdDate: '',
      date: '2024-08-02',
      title: 'Zakupy spożywcze',
      categoryName: 'Shopping',
      categoryId: 'cat-2',
      amount: -200,
      type: TransactionType.Expense
    }];

  getAllTransaction(): Transaction[] {
    return this.transactions;
  }
  
  addTransaction(data: Transaction) {
    data.amount = this.calculateAmount(data.amount, data.type);
    this.transactions.push(data);
    this.categoryService.updateCategoryAmount(data.categoryId, data.amount);
  }

  private calculateAmount(amount: number, type: TransactionType): number {
    return type === TransactionType.Expense ? -Math.abs(amount) : Math.abs(amount);
  }
}
