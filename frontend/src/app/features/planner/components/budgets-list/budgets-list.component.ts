import { Component, effect, inject, Input, signal } from '@angular/core'
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
import { tap } from 'rxjs'
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component'

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
    SpinnerComponent,
  ],
})
export class BudgetsListComponent {
  private dialog = inject(MatDialog)
  private appDataService = inject(AppDataService)
  private budgetReqService = inject(BudgetRequestService)

  protected isLoading = signal(true)
  protected budgetList = this.appDataService.budgetList
  protected displayedColumns = [
    'categoryName',
    'plannedAmount',
    'actualExpenses',
    'difference',
    'status',
    'options',
  ]

  constructor() {
    effect(
      () => {
        if (this.budgetList().length > 0) {
          this.isLoading.set(false)
        }
      },
      { allowSignalWrites: true }
    )
  }

  private removeBudget(id: string) {
    this.isLoading.set(true)
    this.budgetReqService
      .remove(id)
      .pipe(
        tap(() => {
          this.isLoading.set(false)
        })
      )
      .subscribe((budgetList) => {
        this.appDataService.budgetListUpdate(budgetList)
      })
  }

  protected handleRowAction(event: RowAction) {
    console.log(event)

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
