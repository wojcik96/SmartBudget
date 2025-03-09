import { computed, inject, Injectable } from '@angular/core'
import { TransactionType } from '../../../shared/defs/transactions'
import { AppDataService } from '../../../shared/services/app-data.service'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private appDataService = inject(AppDataService)

  public readonly incomeAmount = computed(() =>
    this.appDataService
      .transactionsList()
      .filter((transaction) => transaction.type === TransactionType.Income)
      .reduce(
        (sum, transaction) =>
          transaction.type === TransactionType.Income
            ? sum + Number(transaction.amount)
            : sum,
        0
      )
  )
  public readonly expensesAmount = computed(() =>
    this.appDataService
      .transactionsList()
      .filter((transaction) => transaction.type === TransactionType.Expense)
      .reduce(
        (sum, transaction) =>
          transaction.type === TransactionType.Expense
            ? sum + Number(transaction.amount)
            : sum,
        0
      )
  )
}
