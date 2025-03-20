import { Component, effect, inject, signal, ViewChild } from '@angular/core'
import {
  RowAction,
  RowActionType,
} from '../../../shared/model/row-action.model'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { TransactionFormComponent } from '../transaction-form/transaction-form.component'
import { TransactionRequestService } from '../services/transaction-request.service'
import { AppDataService } from '../../../shared/services/app-data.service'
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component'
import { catchError, EMPTY, tap } from 'rxjs'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import {
  Transaction,
  TransactionDialogData,
  TransactionType,
} from '../../../shared/defs/transactions'
import { RowOptionsComponent } from '../../../shared/components/row-options/row-options.component'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component'
import { ToastService } from '../../../shared/services/toast.service'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    NoDataComponent,
    RowOptionsComponent,
    SpinnerComponent,
  ],
})
export class TransactionListComponent {
  private dialog = inject(MatDialog)
  private appDataService = inject(AppDataService)
  private transactionReqService = inject(TransactionRequestService)
  private toastService = inject(ToastService)
  private paginator!: MatPaginator
  private sort!: MatSort

  protected transactionsList = this.appDataService.transactionsList
  protected transactionType = TransactionType
  protected isLoading = signal(true)
  protected dataSource = new MatTableDataSource<Transaction>([])
  protected displayedColumns = [
    'date',
    'name',
    'accountLabel',
    'categoryLabel',
    'amount',
    'type',
    'options',
  ]

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp
    this.dataSource.paginator = this.paginator
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms
    this.dataSource.sort = this.sort
  }

  constructor() {
    effect(
      () => {
        if (this.transactionsList()) {
          this.dataSource.data = this.transactionsList()
          this.isLoading.set(false)
        }
      },
      { allowSignalWrites: true }
    )
  }

  private openEditElementDialog(transactionId: string): void {
    this.dialog.open<TransactionFormComponent, TransactionDialogData>(
      TransactionFormComponent,
      {
        data: {
          elementId: transactionId,
          title: 'Edit Transaction',
        },
      }
    )
  }

  private removeTransaction(transactionId: string) {
    this.isLoading.set(true)
    this.transactionReqService
      .removeTransaction(transactionId)
      .pipe(
        catchError(() => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.openSuccessToast()
        })
      )
      .subscribe((transactions) => {
        this.appDataService.transactionsListUpdate(transactions)
        this.appDataService.updateAccountsListRequest()
        this.appDataService.updateBudgetListRequest()
        this.isLoading.set(false)
      })
  }

  private openErrorToast(): void {
    this.toastService.openSuccessToast(
      `Oops! We couldn't delete the transaction. Please try again later.`,
      'error'
    )
  }

  private openSuccessToast(): void {
    this.toastService.openSuccessToast(
      'Transaction successfully deleted!',
      'success'
    )
  }

  public handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openEditElementDialog(event.id)
        break
      case RowActionType.Delete:
        this.removeTransaction(event.id)
        break
    }
  }
}
