import { Component, Input } from '@angular/core';

import { AccountItem } from './account-item.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: '[appAccountItem]',
  standalone: true,
  templateUrl: './account-item.component.html',
  styleUrl: './account-item.component.scss',
  imports: [CurrencyValueDirective]
})
export class AccountItemComponent {
  @Input() account!: AccountItem;
}
