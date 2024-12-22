import { Injectable } from '@nestjs/common';
import { generateId } from 'src/utils/id-generator';
import { Transaction, TransactionFormData } from './models/transaction.model';
import { adjustAmountBasedOnType } from 'src/utils/numbers';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TransactionsService {
  private transactionList: Transaction[] = [];

  constructor(private categoriesService: CategoriesService) {}

  public getAllTransactions(): Transaction[] {
    return this.transactionList;
  }

  public addTransaction(data: TransactionFormData): void {
    const newTransaction: Transaction = {
      id: generateId(),
      createdDate: new Date().toLocaleDateString(),
      accountId: data.accountId,
      accountName: data.accountName,
      date: data.date,
      title: data.title,
      amount: adjustAmountBasedOnType(data.amount, data.type),
      categoryId: data.categoryId,
      categoryName: this.categoriesService.getCategoryLabelById(
        data.categoryId,
      ),
      type: data.type,
    };

    this.transactionList.push(newTransaction);
  }

  public updateTransaction(data: TransactionFormData): void {
    this.transactionList = this.transactionList.map((transaction) => {
      if (transaction.id === data.id) {
        return {
          ...transaction,
          date: data.date,
          title: data.title,
          amount: adjustAmountBasedOnType(data.amount, data.type),
          categoryId: data.categoryId,
          accountId: data.accountId,
          accountName: data.accountName,
          categoryName: this.categoriesService.getCategoryLabelById(
            data.categoryId,
          ),
          type: data.type,
        };
      }
      return transaction;
    });
  }

  public removeTransaction(transactionId: string): void {
    this.transactionList.filter(
      (transaction) => transaction.id !== transactionId,
    );
  }
}
