import { Component, computed, inject, Signal } from '@angular/core'

import { BudgetItemComponent } from './budget-item/budget-item.component'
import { BudgetBarItem } from '../../../shared/defs/budgets'
import { AppDataService } from '../../../shared/services/app-data.service'
import { CategoryService } from '../../transaction/category-list/category.service'

@Component({
  selector: 'app-budgets',
  standalone: true,
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
  imports: [BudgetItemComponent],
})
export class BudgetsComponent {
  private appDataService = inject(AppDataService)
  private transactionService = inject(CategoryService)

  protected budgetsList: Signal<BudgetBarItem[]> = computed(() =>
    this.appDataService.budgetList().map((budget) => ({
      category: budget.categoryName,
      categoryId: budget.categoryId,
      amount: budget.plannedAmount,
      currency: budget.currency,
      progress: this.calculatePercentage(
        budget.actualExpenses,
        budget.plannedAmount
      ),
      progressColor: '#000',
      spent: budget.actualExpenses,
    }))
  )

  calculatePercentage(actualExpenses: number, plannedAmount: number) {
    return (Math.abs(actualExpenses) / Math.abs(plannedAmount)) * 100
  }
}
