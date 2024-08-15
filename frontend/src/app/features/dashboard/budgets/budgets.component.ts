import { Component } from '@angular/core';

import { BudgetItemComponent } from "./budget-item/budget-item.component";
import { BudgetItem } from './budget-item.model';

@Component({
  selector: 'app-budgets',
  standalone: true,
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
  imports: [BudgetItemComponent],
})
export class BudgetsComponent {
  budgets: BudgetItem[] = [
    { category: 'Groceries', amount: 1200, spent: 900, progress: 75, progressColor: 'bg-success', currency: 'PLN' },
    { category: 'Entertainment', amount: 800, spent: 400, progress: 50, progressColor: 'bg-warning', currency: 'PLN' },
    { category: 'Utilities', amount: 1000, spent: 300, progress: 30, progressColor: 'bg-danger', currency: 'PLN' },
    { category: 'Transportation', amount: 600, spent: 540, progress: 90, progressColor: 'bg-primary', currency: 'PLN' }
  ];
}
