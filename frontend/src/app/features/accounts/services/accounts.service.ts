import { computed, inject, Injectable } from '@angular/core'
import { AppDataService } from '../../../shared/services/app-data.service'

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private appDataService = inject(AppDataService)
  private accountList = this.appDataService.accountsList

  public readonly allBalance = computed(() => { //TODO: zastanowić się czy wyliczamy też z ujemnym stanem konta??
    return this.accountList().reduce((balance, account) => {
      return Number(balance) + Number(account.balance)
    }, 0)
  })
}
