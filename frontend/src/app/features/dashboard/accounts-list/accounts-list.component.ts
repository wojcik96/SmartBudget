import { Component } from '@angular/core';

import { AccountListHeaderComponent } from './account-list-header/account-list-header.component';
import { AccountItemComponent } from './account-item/account-item.component';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { ColumnType, TableConfig } from '../../../shared/model/table-config.model';
import { AccountType } from '../../accounts/account.model';
import { AccountsService } from '../../accounts/accounts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
  imports: [
    AccountListHeaderComponent,
    AccountItemComponent,
    DataTableComponent,
  ],
})
export class AccountsListComponent {
  private accountsSubscription!: Subscription;
  accountsTableConfig!: TableConfig;
  walletsTableConfig!: TableConfig;
  accountType = AccountType;

  constructor(private accountsService: AccountsService) {}

  private accountTableColumns = [
    { label: 'Account Name', key: 'name', cssClass: 'col' },
    { label: 'Balance', key: 'balance', cssClass: 'col text-end', type: ColumnType.CURRENCY },
  ];

  private walletsTableColumns = [
    { label: 'Wallet Name', key: 'name', cssClass: 'col' },
    { label: 'Cash Amount', key: 'balance', cssClass: 'col text-end', type: ColumnType.CURRENCY },
  ];

  ngOnInit() {
    this.accountsSubscription = this.accountsService.accounts$.subscribe(
      (accounts) => {
        this.accountsTableConfig = {
          columns: this.accountTableColumns,
          data: accounts.filter(
            (account) => account.accountType === AccountType.Bank
          ),
          showDropdownMenu: false,
        };

        this.walletsTableConfig = {
          columns: this.walletsTableColumns,
          data: accounts.filter(
            (account) => account.accountType === AccountType.Wallet
          ),
          showDropdownMenu: false,
        };
      }
    );
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }
}
