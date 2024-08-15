import { Component } from '@angular/core';

import { AccountListHeaderComponent } from './account-list-header/account-list-header.component';
import { AccountItemComponent } from './account-item/account-item.component';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
  imports: [AccountListHeaderComponent, AccountItemComponent],
})
export class AccountsListComponent {
  accountGroups = [
    {
      nameHeader: 'Account Name',
      balanceHeader: 'Balance',
      accounts: [{ name: 'Account 0', balance: 145758.3, currency: 'PLN' }],
      currencyCode: 'PLN',
    },
    {
      nameHeader: 'Wallet Name',
      balanceHeader: 'Cash Amount',
      accounts: [
        { name: 'PL', balance: 5758.3, currency: 'PLN' },
        { name: 'EU', balance: 1758.3, currency: 'EUR' },
      ],
      currencyCode: 'PLN',
    },
  ];
}
