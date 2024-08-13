import { Component } from '@angular/core';

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { TableConfig } from '../../shared/model/table-config.model';
import { AccountSectionComponent } from './account-section/account-section.component';
import { AccountsService, AccountType } from './accounts.service';
import { AccountsFormComponent } from './accounts-form/accounts-form.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  imports: [WrapperComponent, AccountSectionComponent, AccountsFormComponent],
})
export class AccountsComponent {
  accountsTableConfig!: TableConfig;
  walletsTableConfig!: TableConfig;
  accountType = AccountType;

  constructor(private accountsService: AccountsService) {
    this.accountsTableConfig = this.accountsService.getAccountsTableConfig();
    this.walletsTableConfig = this.accountsService.getWalletsConfig();
  }
}
