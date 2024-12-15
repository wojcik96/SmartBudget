import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableConfig } from '../../shared/model/table-config.model';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { AccountSectionComponent } from './components/account-section/account-section.component';
import { AccountType } from '../../shared/defs/accounts';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  imports: [WrapperComponent, AccountSectionComponent],
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
