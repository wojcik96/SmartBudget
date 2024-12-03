import { Injectable } from '@angular/core';
import { generateId } from '../../shared/utils/id-generator';
import { BehaviorSubject } from 'rxjs';
import { loadDataFromLS, saveDataToLS } from '../../shared/utils/localStorage';
import { ColumnType } from '../../shared/model/table-config.model';
import { StatusOption } from '../../shared/model/status-type.model';
import {
  AccountDetails,
  AccountsFormData,
  AccountType,
} from '../../shared/defs/accounts';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private ACCOUNT_LIST_KEY = 'SmBu-AccLis';
  private accountsListSummary = loadDataFromLS(this.ACCOUNT_LIST_KEY) || [];
  private accountsSubject = new BehaviorSubject<AccountDetails[]>(
    this.accountsListSummary
  );
  public accounts$ = this.accountsSubject.asObservable();

  private accountTableColumns = [
    {
      label: 'Account Name',
      key: 'name',
      cssClass: 'col-4',
      type: ColumnType.NAME,
    },
    {
      label: 'Import Status',
      key: 'status',
      cssClass: 'col',
      type: ColumnType.STATUS,
    },
    { label: 'Last Import Date', key: 'lastImportDate', cssClass: 'col-3' },
    {
      label: 'Balance',
      key: 'balance',
      cssClass: 'col-2 text-end',
      type: ColumnType.CURRENCY,
    },
  ];

  private walletsTableColumns = [
    { label: 'Name', key: 'name', cssClass: 'col-4', type: ColumnType.NAME },
    { label: 'Date Added', key: 'createDate', cssClass: 'col' },
    {
      label: 'Balance',
      key: 'balance',
      cssClass: 'col-3',
      type: ColumnType.CURRENCY,
    },
    { label: '', key: 'empty', cssClass: 'col-2 text-end' },
  ];

  public getWalletsTableColumns() {
    return this.walletsTableColumns;
  }

  public getAccountsTableColumns() {
    return this.accountTableColumns;
  }

  public getAllBalance() {
    return this.accountsSubject.value.reduce((balance, account) => {
      return balance + account.balance;
    }, 0);
  }

  private addEntry(type: AccountType, data: AccountsFormData): void {
    const entryId = generateId(type);
    const newEntry: AccountDetails = {
      id: entryId,
      name: data.name,
      balance: data.amount,
      currency: data.currency,
      createDate: new Date().toLocaleDateString(),
      accountType: type,
    };

    if (type === AccountType.Bank) {
      newEntry.status = { type: StatusOption.SUCCESS, label: 'Active' };
      newEntry.lastImportDate = new Date().toLocaleDateString();
    }

    this.accountsSubject.next([...this.accountsSubject.getValue(), newEntry]);
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value);
  }

  private updateEntry(type: AccountType, data: AccountsFormData): void {
    const updatedAccounts = this.accountsSubject
      .getValue()
      .map((account) => {
        if (account.id === data.id) {
          return {
            ...account,
            balance: data.amount,
            currency: data.currency,
            name: data.name,
          };
        }
        return account;
      });

    this.accountsSubject.next(updatedAccounts);
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value);
  }

  public saveDetails(type: AccountType, data: AccountsFormData): void {
    if (data.id) {
      this.updateEntry(type, data);
    } else {
      this.addEntry(type, data);
    }
  }

  public removeEntry(accountId: string): void {
    const updatedAccounts = this.accountsSubject
      .getValue()
      .filter((account) => account.id !== accountId);

    this.accountsSubject.next(updatedAccounts);
    saveDataToLS(this.ACCOUNT_LIST_KEY, this.accountsSubject.value);
  }
}
