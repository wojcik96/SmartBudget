import { Component, Input } from '@angular/core';

import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';
import { BudgetBarItem } from '../../../../shared/defs/budgets';

@Component({
  selector: '[appBudgetItem]',
  standalone: true,
  templateUrl: './budget-item.component.html',
  styleUrl: './budget-item.component.scss',
  imports: [CurrencyValueDirective],
})
export class BudgetItemComponent {
  @Input({required: true}) itemData!: BudgetBarItem;
}
