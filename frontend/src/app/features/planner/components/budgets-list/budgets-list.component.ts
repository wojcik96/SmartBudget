import { Component, inject, Input } from '@angular/core'
import {
  RowAction,
  RowActionType,
} from '../../../../shared/model/row-action.model'
import { BudgetFormComponent } from '../budget-form/budget-form.component'
import { MatDialog } from '@angular/material/dialog'
import { AppDataService } from '../../../../shared/services/app-data.service'
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component'
import { BudgetRequestService } from '../../services/budget-request.service'
import { MatTableModule } from '@angular/material/table'
import { RowOptionsComponent } from '../../../../shared/components/row-options/row-options.component'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
  imports: [
    MatTableModule,
    MatButtonModule,
    RowOptionsComponent,
    NoDataComponent,
  ],
})
export class BudgetsListComponent {
  private dialog = inject(MatDialog)
  private appDataService = inject(AppDataService)
  private budgetReqService = inject(BudgetRequestService)

  protected budgetList = this.appDataService.budgetList
  protected displayedColumns = [
    'categoryName',
    'plannedAmount',
    'actualExpenses',
    'difference',
    'status',
    'options',
  ]

  private removeBudget(id: string) {
    this.budgetReqService.remove(id).subscribe((budgetList) => {
      this.appDataService.budgetListUpdate(budgetList)
    })
  }

  protected handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openBudgetDialog(event.id)
        break
      case RowActionType.Delete:
        this.removeBudget(event.id)
        break
    }
  }

  public openBudgetDialog(id?: string) {
    this.dialog.open(BudgetFormComponent, {
      data: {
        ...(id && { id: id }),
        title: id ? 'Edit Budget' : 'Add Budget',
      },
    })
  }
}
