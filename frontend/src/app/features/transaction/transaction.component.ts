import { Component, inject } from '@angular/core'

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionFormComponent } from './transaction-form/transaction-form.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { TransactionDialogData } from '../../shared/defs/transactions'

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  imports: [
    WrapperComponent,
    CategoryListComponent,
    TransactionListComponent,
    MatButtonModule,
  ],
})
export class TransactionComponent {
  private dialog = inject(MatDialog)

  openNewTransactionDialog() {
    this.dialog.open<TransactionFormComponent, TransactionDialogData>(TransactionFormComponent, {
      data: {
        title: 'Add Transaction',
      },
    })
  }
}
