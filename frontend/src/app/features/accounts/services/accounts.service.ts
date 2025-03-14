import { computed, inject, Injectable } from '@angular/core'
import { AppDataService } from '../../../shared/services/app-data.service'

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private appDataService = inject(AppDataService)

  protected accountList = this.appDataService.accountsList

  public readonly allBalance = computed(() => {
    return this.accountList().reduce((balance, account) => {
      return balance + account.balance
    }, 0)
  })

  // constructor() {
  //   effect(
  //     () => {
  //       this.updateAccountsBalance(this.transactions())
  //     },
  //     { allowSignalWrites: true }
  //   )
  // }

  // public getAllBalance() {
  //   return this.accountsSubject.value.reduce((balance, account) => {
  //     return balance + account.balance
  //   }, 0)
  // }

  // private updateAccountsBalance(transaction: Transaction[] | undefined): void {
  //   if (!transaction) {
  //     return
  //   }

  //   const updatedAccounts = this.accountsSubject.getValue().map((account) => {
  //     const totalBalance = transaction
  //       .filter((transaction) => transaction.accountId === account.id)
  //       .reduce((sum, transaction) => sum + transaction.amount, 0)

  //     return {
  //       ...account,
  //       balance: totalBalance,
  //     }
  //   })

  //   this.accountsSubject.next(updatedAccounts)
  //   saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value)
  // }

  public getAccountLabelById(id: string): string {
    return this.accountList().find((account) => account.id === id)?.name || ''
  }
}
