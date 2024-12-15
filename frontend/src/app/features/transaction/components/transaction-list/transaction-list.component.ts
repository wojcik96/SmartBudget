import { Component, inject } from '@angular/core'

import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component'
import {
  ColumnType,
  TableConfig,
} from '../../../../shared/model/table-config.model'
import {
  RowAction,
  RowActionType,
} from '../../../../shared/model/row-action.model'
import { TransactionFormComponent } from '../transaction-form/transaction-form.component'
import { MatDialog } from '@angular/material/dialog'
import { TransactionService } from '../../services/transaction.service'

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  imports: [DataTableComponent],
})
export class TransactionListComponent {
  private dialog = inject(MatDialog)
  private transactionService = inject(TransactionService)
  private transactionTableColumns = [
    { label: 'Date', key: 'date', cssClass: 'col-2' },
    { label: 'Title', key: 'title', cssClass: 'col', type: ColumnType.NAME },
    { label: 'Category', key: 'categoryName', cssClass: 'col-3' },
    {
      label: 'Amount',
      key: 'amount',
      cssClass: 'col-2',
      type: ColumnType.CURRENCY,
    },
  ]
  tableConfig!: TableConfig

  ngOnInit() {
    this.transactionService.transaction$.subscribe((transactions) => {
      this.tableConfig = {
        columns: this.transactionTableColumns,
        data: transactions,
        showDropdownMenu: true,
      }
    })
  }

  handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openEditElementDialog(event.rowId)
        break
      case RowActionType.Delete:
        this.transactionService.removeTransaction(event.rowId)
        break
    }
  }

  openEditElementDialog(elementId: string): void {
    this.dialog.open(TransactionFormComponent, {
      data: {
        elementId: elementId,
        title: 'Edytuj Portfel',
      },
    })
  }
}
