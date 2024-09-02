import { Injectable } from '@angular/core';
import { generateId } from '../../shared/utils/id-generator';
import { BehaviorSubject } from 'rxjs';
import { Account, AccountData, AccountType } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accountsSubject = new BehaviorSubject<Account[]>([
    {
      id: 'hjgdsu3',
      createDate: '08.02.2024',
      name: 'Wallet PL',
      currency: 'PLN',
      balance: 145758.3,
      accountType: AccountType.Wallet,
    },
    {
      id: 'wl-dagjy34',
      createDate: '10.02.2024',
      name: 'EUR Wallet',
      currency: 'EUR',
      balance: 10000,
      accountType: AccountType.Wallet,
    },
    {
      id: 'fdsa3',
      createDate: '08.02.2024',
      name: 'Account 0',
      currency: 'PLN',
      balance: 145758.3,
      accountType: AccountType.Bank,
      importStatus: 'Active',
      lastImportDate: '08.02.2024',
    },
  ]);
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
  }

  removeEntry(accountId: string) {
    const updatedAccounts = this.accountsSubject
      .getValue()
      .filter((account) => account.id !== accountId);
    this.accountsSubject.next(updatedAccounts);
  }
}
