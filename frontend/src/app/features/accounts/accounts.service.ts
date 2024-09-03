import { Injectable } from '@angular/core';
import { generateId } from '../../shared/utils/id-generator';
import { BehaviorSubject } from 'rxjs';
import { Account, AccountData, AccountType } from './account.model';
import { loadDataFromLS, saveDataToLS } from '../../shared/utils/localStorage';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private ACCOUNT_LIST_KEY = 'SmBu-AccLis';
  private accountsListSummary = loadDataFromLS(this.ACCOUNT_LIST_KEY) || [];
  private accountsSubject = new BehaviorSubject<Account[]>(this.accountsListSummary);
  public accounts$ = this.accountsSubject.asObservable();

  private accountTableColumns = [
    { label: 'Account Name', key: 'name', width: 'col-2' },
    { label: 'Import Status', key: 'importStatus', width: 'col' },
    { label: 'Last Import Date', key: 'lastImportDate', width: 'col-3' },
    { label: 'Balance', key: 'balance', width: 'col-2 text-end' },
  ];

  private walletsTableColumns = [
    { label: 'Date Added', key: 'createDate', width: 'col-2' },
    { label: 'Name', key: 'name', width: 'col' },
    { label: 'Balance', key: 'balance', width: 'col-3' },
    { label: '', key: 'empty', width: 'col-2 text-end' },
  ];

  getWalletsTableColumns() {
    return this.walletsTableColumns;
  }

  getAccountsTableColumns() {
    return this.accountTableColumns;
  }

  getAllBalance() {
    let balance = 0;
    this.accountsSubject.value.forEach(account => {
      balance += account.balance;
    });

    return balance;
  }

  addEntry(type: AccountType, data: AccountData) {
    const entryId = generateId(type);
    const newEntry: Account = {
      id: entryId,
      name: data.name,
      balance: data.amount,
      currency: data.currency,
      createDate: new Date().toLocaleDateString(),
      accountType: type,
    };

    if (type === AccountType.Bank) {
      newEntry.importStatus = 'Active';
      newEntry.lastImportDate = new Date().toLocaleDateString();
    }

    this.accountsSubject.next([...this.accountsSubject.getValue(), newEntry]);
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value);
  }

  removeEntry(accountId: string) {
    const updatedAccounts = this.accountsSubject
      .getValue()
      .filter((account) => account.id !== accountId);
    this.accountsSubject.next(updatedAccounts);
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value);
  }
}
