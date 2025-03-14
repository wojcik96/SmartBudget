import { Component } from '@angular/core';

import { ColumnType, TableConfig } from '../../../shared/model/table-config.model';
import { Subscription } from 'rxjs';
import { AccountType } from '../../../shared/defs/accounts';
import { AccountsService } from '../../accounts/services/accounts.service';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
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

  // ngOnInit() {
  //   this.accountsSubscription = this.accountsService.accounts$.subscribe(
  //     (accounts) => {
  //       this.accountsTableConfig = {
  //         columns: this.accountTableColumns,
  //         data: accounts.filter(
  //           (account) => account.accountType === AccountType.Bank
  //         ),
  //         showDropdownMenu: false,
  //       };

  //       this.walletsTableConfig = {
  //         columns: this.walletsTableColumns,
  //         data: accounts.filter(
  //           (account) => account.accountType === AccountType.Wallet
  //         ),
  //         showDropdownMenu: false,
  //       };
  //     }
  //   );
  // }

  // ngOnDestroy() {
  //   this.accountsSubscription.unsubscribe();
  // }
}
