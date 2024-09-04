import { Injectable } from '@angular/core'
import { generateId } from '../../shared/utils/id-generator'
import { BehaviorSubject } from 'rxjs'
import { Account, AccountData, AccountType } from './account.model'
import { loadDataFromLS, saveDataToLS } from '../../shared/utils/localStorage'
import { ColumnType } from '../../shared/model/table-config.model'
import { StatusOption } from '../../shared/model/status-type.model'

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private ACCOUNT_LIST_KEY = 'SmBu-AccLis'
  private accountsListSummary = loadDataFromLS(this.ACCOUNT_LIST_KEY) || []
  private accountsSubject = new BehaviorSubject<Account[]>(this.accountsListSummary)
  public accounts$ = this.accountsSubject.asObservable()

  private accountTableColumns = [
    { label: 'Account Name', key: 'name', cssClass: 'col-2 fw-bold' },
    { label: 'Import Status', key: 'status', cssClass: 'col', type: ColumnType.STATUS },
    { label: 'Last Import Date', key: 'lastImportDate', cssClass: 'col-3' },
    { label: 'Balance', key: 'balance', cssClass: 'col-2 text-end', type: ColumnType.CURRENCY },
  ];

  private walletsTableColumns = [
    { label: 'Date Added', key: 'createDate', cssClass: 'col-2' },
    { label: 'Name', key: 'name', cssClass: 'col fw-bold' },
    { label: 'Balance', key: 'balance', cssClass: 'col-3', type: ColumnType.CURRENCY },
    { label: '', key: 'empty', cssClass: 'col-2 text-end' },
  ];

  getWalletsTableColumns() {
    return this.walletsTableColumns
  }

  getAccountsTableColumns() {
    return this.accountTableColumns
  }

  getAllBalance() {
    let balance = 0
    this.accountsSubject.value.forEach((account) => {
      balance += account.balance
    })

    return balance
  }

  addEntry(type: AccountType, data: AccountData) {
    const entryId = generateId(type)
    const newEntry: Account = {
      id: entryId,
      name: data.name,
      balance: data.amount,
      currency: data.currency,
      createDate: new Date().toLocaleDateString(),
      accountType: type,
    }

    if (type === AccountType.Bank) {
      newEntry.status = { type: StatusOption.SUCCESS, label: 'Active' }
      newEntry.lastImportDate = new Date().toLocaleDateString()
    }

    this.accountsSubject.next([...this.accountsSubject.getValue(), newEntry])
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value)
  }

  removeEntry(accountId: string) {
    const updatedAccounts = this.accountsSubject
      .getValue()
      .filter((account) => account.id !== accountId)
    this.accountsSubject.next(updatedAccounts)
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value)
  }
}
