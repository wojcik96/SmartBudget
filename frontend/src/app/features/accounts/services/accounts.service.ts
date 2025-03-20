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
}
