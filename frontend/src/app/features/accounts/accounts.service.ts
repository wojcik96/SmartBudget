import { Injectable } from '@angular/core';
import { TableConfig } from '../../shared/model/table-config.model';
import { generateId } from '../../shared/utils/id-generator';

type WalletInput = {
  name: string;
  amount: number;
  currency: string;
};

type AccountInput = {
  name: string;
  amount: number;
  currency: string;
};

 export enum AccountType {
  BankAccount = 'bank',
  Wallet = 'wallet'
 }


@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private accountTableConfig: TableConfig = {
    columns: [
      { label: 'Account Name', key: 'accountName', width: 'col-2' },
      { label: 'Import Status', key: 'importStatus', width: 'col' },
      { label: 'Last Import Date', key: 'lastImportDate', width: 'col-3' },
      { label: 'Balance', key: 'balance', width: 'col-2 text-end' },
    ],
    data: [
      {
        id: 'fdsa3',
        accountName: 'Account 0',
        importStatus: 'Active',
        lastImportDate: '08/02/2024',
        balance: '145,758.30 PLN',
      },
    ],
  };

  private walletsTableConfig: TableConfig = {
    columns: [
      { label: 'Date Added', key: 'dateAdded', width: 'col-2' },
      { label: 'Name', key: 'name', width: 'col' },
      { label: 'Balance', key: 'balance', width: 'col-3' },
      { label: '', key: 'empty', width: 'col-2 text-end' },
    ],
    data: [
      {
        id: 'hjgdsu3',
        dateAdded: '08.02.2024',
        name: 'Wallet PL',
        balance: '145,758.30 PLN',
      },
      {
        id: '78dsfsv',
        dateAdded: '10.02.2024',
        name: 'EUR',
        balance: '5,765.40 EUR',
      },
    ],
  };

  constructor() {}

  getWalletsConfig() {
    return this.walletsTableConfig;
  }

  getAccountsTableConfig() {
    return this.accountTableConfig;
  }

  addEntry(type: AccountType | string | undefined, { name, amount, currency }: WalletInput | AccountInput) {
    console.log('Service - addEntry : type', type );
    
    const entryId = type === AccountType.BankAccount ? generateId('wl') : generateId('acc');
    const balance = `${amount} ${currency}`;
  
    if (type === AccountType.Wallet) {
      this.walletsTableConfig.data.push({
        id: entryId,
        dateAdded: new Date().toLocaleDateString(),
        name: name,
        balance: balance,
      });
    } else if (type === AccountType.BankAccount) {
      this.accountTableConfig.data.push({
        id: entryId,
        accountName: name,
        importStatus: 'Active',
        lastImportDate: new Date().toLocaleDateString(), 
        balance: balance,
      });
    }
  }
  
}
