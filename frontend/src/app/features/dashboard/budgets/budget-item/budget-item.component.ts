import { Component, Input, input } from '@angular/core';

import { BudgetItem } from '../budget-item.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: '[appBudgetItem]',
  standalone: true,
  templateUrl: './budget-item.component.html',
  styleUrl: './budget-item.component.scss',
  imports: [CurrencyValueDirective],
})
export class BudgetItemComponent {
  @Input({required: true}) itemData!: BudgetItem;
}
