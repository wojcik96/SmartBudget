import { Component, DestroyRef, inject, signal } from '@angular/core'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { DialogRef } from '@angular/cdk/dialog'
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component'
import { TransactionFormModel } from '../models/transaction-form.model'
import {
  CreateTransactionDto,
  TransactionDialogData,
  TransactionType,
  UpdateTransactionDto,
} from '../../../shared/defs/transactions'
import { AppDataService } from '../../../shared/services/app-data.service'
import { ToastService } from '../../../shared/services/toast.service'
import { TransactionRequestService } from '../services/transaction-request.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { catchError, EMPTY, tap } from 'rxjs'

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    SpinnerComponent,
  ],
})
export class TransactionFormComponent {
  private destroyRef = inject(DestroyRef)
  private dialogRef = inject(DialogRef)
  private formBuilder = inject(FormBuilder)
  private appDataService = inject(AppDataService)
  private transactionReqService = inject(TransactionRequestService)
  private toastService = inject(ToastService)

  protected transactionList = this.appDataService.transactionsList
  protected accountsList = this.appDataService.accountsList
  protected categoriesList = this.appDataService.categoriesList
  protected isLoading = signal(false)
  protected transactionType = TransactionType
  protected form = TransactionFormModel.getForm(this.formBuilder)
  protected data = inject<TransactionDialogData>(MAT_DIALOG_DATA)

  ngOnInit() {
    this.getDetails()
  }

  private createTransaction(data: CreateTransactionDto) {
    const createData: CreateTransactionDto = {
      name: data.name,
      date: data.date,
      type: data.type,
      accountId: data.accountId,
      categoryId: data.categoryId,
      amount: data.amount,
    }

    this.transactionReqService
      .createTransaction(createData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.isLoading.set(false)
          this.openSuccessToast()
        })
      )
      .subscribe((transactionList) => {
        this.appDataService.transactionsListUpdate(transactionList)
        this.dialogRef.close()
      })
  }

  private updateTransaction(data: UpdateTransactionDto) {
    const updateData: UpdateTransactionDto = {
      id: data.id,
      name: data.name,
      date: data.date,
      type: data.type,
      accountId: data.accountId,
      categoryId: data.categoryId,
      amount: data.amount,
    }

    this.transactionReqService
      .updateTransaction(updateData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.isLoading.set(false)
          this.openSuccessToast()
        })
      )
      .subscribe((transactionList) => {
        this.appDataService.transactionsListUpdate(transactionList)
        this.dialogRef.close()
      })
  }

  private saveForm(data: CreateTransactionDto | UpdateTransactionDto): void {
    this.isLoading.set(true)
    const formData = this.form.getRawValue()

    formData.id?.length
      ? this.updateTransaction(formData)
      : this.createTransaction(formData)
  }

  private getDetails(): void {
    const selectedTransaction = this.transactionList()?.find(
      (transaction) => transaction.id === this.data.elementId
    )

    if (!selectedTransaction) return

    this.form.patchValue({ ...selectedTransaction })
  }

  private openSuccessToast(): void {
    this.toastService.openSuccessToast(
      'You have successfully saved the transaction!',
      'success',
      {
        horizontalPosition: 'right',
        duration: 3000,
      }
    )
  }

  private openErrorToast(): void {
    this.toastService.openSuccessToast(
      'Something went wrong. The transaction could not be saved.',
      'error',
      {
        horizontalPosition: 'right',
        duration: 3000,
      }
    )
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.saveForm(this.form.getRawValue())
  }
}
