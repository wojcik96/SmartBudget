import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Account } from '../account.model';

@Component({
  selector: 'app-account-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './account-item.component.html',
  styleUrl: './account-item.component.scss'
})
export class AccountItemComponent {
  account = input.required<Account>();
}
