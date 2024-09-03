import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../shared/model/table-config.model';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import {
  RowAction,
  RowActionType,
} from '../../../shared/model/row-action.model';
import { BudgetModel } from '../budget.model';
import { PlannerService } from '../planner.service';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss',
  imports: [DataTableComponent, BudgetFormComponent, BudgetFormComponent],
})
export class BudgetsListComponent {
  @Input() config!: TableConfig;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) modalText!: string;
  private budgetsSubscription!: Subscription;

  constructor(
    private modalService: ModalService,
    private plannerService: PlannerService
  ) {}

  ngOnInit() {
    this.budgetsSubscription = this.plannerService.budgetsSummary$.subscribe(
      (budgets) => {
        this.config = {
          columns: this.plannerService.getBudgetsTableColumns(),
          data: budgets,
          showDropdownMenu: false,
        };
      }
    );
  }

  ngOnDestroy() {
    this.budgetsSubscription.unsubscribe();
  }

  handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        console.log(RowActionType.Edit, event.rowId);
        break;
      case RowActionType.Delete:
        console.log(RowActionType.Delete, event.rowId);
        break;
    }
  }

  openModal() {
    this.modalService.open({
      title: this.modalText,
      saveButtonLabel: 'Add',
      closeButtonLabel: 'Cancel',
    });
  }
}
