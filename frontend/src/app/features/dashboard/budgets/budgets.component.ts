import { Component, inject } from '@angular/core'

import { BudgetItemComponent } from './budget-item/budget-item.component'
import { PlannerService } from '../../planner/services/planner.service'
import { BudgetBarItem } from '../../../shared/defs/budgets'
import { TransactionService } from '../../transaction/services/transaction.service'

@Component({
  selector: 'app-budgets',
  standalone: true,
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
  imports: [BudgetItemComponent],
})
export class BudgetsComponent {
  private plannerService = inject(PlannerService)
  private transactionService = inject(TransactionService)

  public budgets: BudgetBarItem[] = []

  ngOnInit() {
    this.plannerService.budgetsSummary$.subscribe((data) => {
      data.forEach((budget) => {
        this.budgets.push({
          category: budget.categoryName,
          categoryId: budget.categoryId,
          amount: budget.plannedAmount,
          currency: budget.currency,
          progress: this.calculatePercentage(
            budget.actualExpenses,
            budget.plannedAmount
          ),
          progressColor: this.transactionService.getCategoryColorById(budget.categoryId),
          spent: budget.actualExpenses,
        })
      })
    })
  }

  calculatePercentage(actualExpenses: number, plannedAmount: number) {
    return (Math.abs(actualExpenses) / Math.abs(plannedAmount)) * 100
  }
}
