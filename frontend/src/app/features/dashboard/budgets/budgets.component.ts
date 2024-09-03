import { Component } from '@angular/core'

import { BudgetItemComponent } from './budget-item/budget-item.component'
import { BudgetItem } from './budget-item.model'
import { PlannerService } from '../../planner/planner.service'
import { Categories } from '../../../shared/model/category.enum'

@Component({
  selector: 'app-budgets',
  standalone: true,
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
  imports: [BudgetItemComponent],
})
export class BudgetsComponent {
  budgets: BudgetItem[] = []
  constructor(private plannerService: PlannerService) {}

  ngOnInit() {
    this.plannerService.budgetsSummary$.subscribe((data) => {
      data.forEach((budget) => {
        console.log(
          '(budget.actualExpenses/budget.plannedAmount) * 100',
          ((budget.actualExpenses * -1) / budget.plannedAmount) * 100
        )

        this.budgets.push({
          category: budget.categoryName,
          amount: budget.plannedAmount,
          currency: budget.currency,
          progress: this.calculatePercentage(
            budget.actualExpenses,
            budget.plannedAmount
          ),
          progressColor: 'red',
          spent: budget.actualExpenses,
        })
      })
    })
  }

  calculatePercentage(actualExpenses: number, plannedAmount: number) {
    return (Math.abs(actualExpenses) / Math.abs(plannedAmount)) * 100
  }
}
