import { Component, inject } from '@angular/core'

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionFormComponent } from './transaction-form/transaction-form.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  imports: [
    WrapperComponent,
    CategoryListComponent,
    TransactionListComponent,
  ],
})
export class TransactionComponent {
  private dialog = inject(MatDialog)

  openNewTransactionDialog() {
    this.dialog.open<TransactionFormComponent>(TransactionFormComponent, {
      data: {
        title: 'Dodaj Transakcję',
      },
    })
  }
}
