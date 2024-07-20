import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { BudgetItem } from '../budget-item.model';

@Component({
  selector: 'app-budget-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './budget-item.component.html',
  styleUrl: './budget-item.component.scss'
})
export class BudgetItemComponent {
  itemData = input<BudgetItem>();
}
