import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountsService } from './accounts.service';
import { TableConfig } from '../../shared/model/table-config.model';
import { AccountType } from './account.model';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { AccountSectionComponent } from './account-section/account-section.component';
import { AccountsFormComponent } from './accounts-form/accounts-form.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  imports: [WrapperComponent, AccountSectionComponent, AccountsFormComponent],
})
export class AccountsComponent {
  private accountsSubscription!: Subscription;
  accountsTableConfig!: TableConfig;
  walletsTableConfig!: TableConfig;
  accountType = AccountType;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsSubscription = this.accountsService.accounts$.subscribe(
      (accounts) => {
        this.accountsTableConfig = {
          columns: this.accountsService.getAccountsTableColumns(),
          data: accounts.filter(
            (account) => account.accountType === AccountType.Bank
          ),
          showDropdownMenu: true
        };

        this.walletsTableConfig = {
          columns: this.accountsService.getWalletsTableColumns(),
          data: accounts.filter(
            (account) => account.accountType === AccountType.Wallet
          ),
          showDropdownMenu: true
        };
      }
    );
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }
}
