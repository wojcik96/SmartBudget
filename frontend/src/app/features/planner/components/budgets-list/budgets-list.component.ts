import { Component, inject, Input } from '@angular/core';
import { TableConfig } from '../../../../shared/model/table-config.model';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import {
  RowAction,
  RowActionType,
} from '../../../../shared/model/row-action.model';
import { Subscription } from 'rxjs';
import { PlannerService } from '../../services/planner.service';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
  imports: [DataTableComponent],
})
export class BudgetsListComponent {
  @Input() config!: TableConfig;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) modalText!: string;

  private dialog = inject(MatDialog)
  private plannerService = inject(PlannerService)
  private budgetsSubscription!: Subscription;

  ngOnInit() {
    this.budgetsSubscription = this.plannerService.budgetsSummary$.subscribe(
      (budgets) => {
        this.config = {
          columns: this.plannerService.getBudgetsTableColumns(),
          data: budgets,
          showDropdownMenu: true,
        };
      }
    );
  }

  ngOnDestroy() {
    this.budgetsSubscription.unsubscribe();
  }
  
  public handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openEditBudgetDialog(event.rowId)
        break
      case RowActionType.Delete:
        this.plannerService.removeBudget(event.rowId)
        break
    }
  }

  protected openNewBudgetDialog() {
    this.dialog.open(BudgetFormComponent, {
      data: {
        title: 'Dodaj Budżet',
      },
    })
  }

  private openEditBudgetDialog(id: string): void {
    this.dialog.open(BudgetFormComponent, {
      data: {
        elementId: id,
        title: 'Edytuj Budżet',
      },
    })
  }
}
