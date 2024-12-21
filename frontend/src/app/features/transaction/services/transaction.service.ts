import { Injectable, signal } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import {
  Transaction,
  TransactionFormData,
  TransactionType,
} from '../../../shared/defs/transactions'
import { generateId } from '../../../shared/utils/id-generator'
import {
  loadDataFromLS,
  saveDataToLS,
} from '../../../shared/utils/localStorage'
import { adjustAmountBasedOnType } from '../../../shared/utils/numbers'
import { Categories } from '../../../shared/model/category.enum'
import { Category } from '../category-list/model/category.model'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private TRANSACTION_LIST_KEY = 'SmBu-TraLis'
  private transactionSummaryList =
    loadDataFromLS(this.TRANSACTION_LIST_KEY) || []
  private transactionSubject = new BehaviorSubject<Transaction[]>(
    this.transactionSummaryList
  )
  public transaction$ = this.transactionSubject.asObservable()

  readonly incomeAmount = signal<number>(0)
  readonly expensesAmount = signal<number>(0)

  constructor() {
    this.transactionSubject.subscribe(() => {
      this.setIncomesAndExpenses()
    })
  }

  private addTransaction(data: TransactionFormData): void {
    const newEntry: Transaction = {
      id: generateId(),
      createdDate: new Date().toLocaleDateString(),
      accountId: data.accountId,
      accountName: data.accountName,
      date: data.date,
      title: data.title,
      amount: adjustAmountBasedOnType(data.amount, data.type),
      categoryId: data.categoryId,
      categoryName: this.getCategoryLabelById(data.categoryId),
      type: data.type,
    }

    this.transactionSubject.next([
      ...this.transactionSubject.getValue(),
      newEntry,
    ])
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }

  private updateTransaction(data: TransactionFormData): void {
    const updatedTransaction = this.transactionSubject
      .getValue()
      .map((transaction) => {
        if (transaction.id === data.id) {
          return {
            ...transaction,
            date: data.date,
            title: data.title,
            amount: adjustAmountBasedOnType(data.amount, data.type),
            categoryId: data.categoryId,
            accountId: data.accountId,
            accountName: data.accountName,
            categoryName: this.getCategoryLabelById(data.categoryId),
            type: data.type,
          }
        }
        return transaction
      })

    this.transactionSubject.next(updatedTransaction)
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }

  private getCategoryLabelById(categoryId: string): string {
    return (
      this.allCategories.find((category) => category.id === categoryId)
        ?.label || ''
    )
  }

  private allCategories: Category[] = [
    {
      id: 'cat-1',
      label: Categories['cat-1'],
      icon: 'bi bi-plus-circle-dotted',
      color: '#28a745',
    },
    {
      id: 'cat-2',
      label: Categories['cat-2'],
      icon: 'bi bi-cart',
      color: '#dc3545',
    },
    {
      id: 'cat-3',
      label: Categories['cat-3'],
      icon: 'bi bi-house',
      color: '#ffc107',
    },
    {
      id: 'cat-4',
      label: Categories['cat-4'],
      icon: 'bi bi-car',
      color: '#17a2b8',
    },
    {
      id: 'cat-5',
      label: Categories['cat-5'],
      icon: 'bi bi-heart',
      color: '#fd7e14',
    },
    {
      id: 'cat-6',
      label: Categories['cat-6'],
      icon: 'bi bi-bank',
      color: '#6f42c1',
    },
    {
      id: 'cat-7',
      label: Categories['cat-7'],
      icon: 'bi bi-film',
      color: '#20c997',
    },
    {
      id: 'cat-8',
      label: Categories['cat-8'],
      icon: 'bi bi-shield-lock',
      color: '#343a40',
    },
    {
      id: 'cat-9',
      label: Categories['cat-9'],
      icon: 'bi bi-person-heart',
      color: '#007bff',
    },
    {
      id: 'cat-10',
      label: Categories['cat-10'],
      icon: 'bi bi-briefcase',
      color: '#6610f2',
    },
  ]

  private setIncomesAndExpenses(): void {
    this.incomeAmount.set(this.calculateSumByType(TransactionType.Income))
    this.expensesAmount.set(this.calculateSumByType(TransactionType.Expense))
  }

  private calculateSumByType(type: TransactionType) {
    return this.transactionSubject
      .getValue()
      .filter((transaction) => transaction.type === type)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }

  public getCategoryColorById(categoryId: string): string {
    return (
      this.allCategories.find((category) => category.id === categoryId)
        ?.color || ''
    )
  }

  public saveDetails(data: Transaction): void {
    if (data.id) {
      this.updateTransaction(data)
    } else {
      this.addTransaction(data)
    }
  }

  public removeTransaction(transactionId: string): void {
    const updatedAccounts = this.transactionSubject
      .getValue()
      .filter((transaction) => transaction.id !== transactionId)

    this.transactionSubject.next(updatedAccounts)
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }
}
