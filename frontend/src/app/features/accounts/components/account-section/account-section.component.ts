import { Component, inject, Input } from '@angular/core'

import { TableConfig } from '../../../../shared/model/table-config.model'
import {
  RowAction,
  RowActionType,
} from '../../../../shared/model/row-action.model'
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AccountType } from '../../../../shared/defs/accounts'
import { AccountsService } from '../../services/accounts.service'
import { AccountsFormComponent } from '../accounts-form/accounts-form.component'

@Component({
  selector: 'app-account-section',
  standalone: true,
  templateUrl: './account-section.component.html',
  styleUrl: './account-section.component.scss',
  imports: [DataTableComponent, MatDialogModule],
})
export class AccountSectionComponent {
  private accountsService = inject(AccountsService)
  private dialog = inject(MatDialog)

  @Input({ required: true }) config!: TableConfig
  @Input({ required: true }) accountType!: AccountType
  @Input({ required: true }) title!: string
  @Input({ required: true }) modalText!: string

  handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openEditElementDialog(event.rowId)
        break
      case RowActionType.Delete:
        this.accountsService.removeEntry(event.rowId)
        break
    }
  }

  openNewElementDialog() {
    this.dialog.open(AccountsFormComponent, {
      data: {
        title: 'Dodaj Portfel',
        type: this.accountType,
      },
    })
  }

  openEditElementDialog(productId: string): void {
    this.dialog.open(AccountsFormComponent, {
      data: {
        productId: productId,
        title: 'Edytuj Portfel',
        type: this.accountType,
      },
    })
  }
}
