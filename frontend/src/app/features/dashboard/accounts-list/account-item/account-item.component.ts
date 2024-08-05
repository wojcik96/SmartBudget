import { Component, input } from '@angular/core';

import { Account } from '../account.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: '[appAccountItem]',
  standalone: true,
  templateUrl: './account-item.component.html',
  styleUrl: './account-item.component.scss',
  imports: [CurrencyValueDirective]
})
export class AccountItemComponent {
  account = input.required<Account>();
}
