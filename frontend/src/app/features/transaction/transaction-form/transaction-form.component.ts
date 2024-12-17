import { Component, DestroyRef, inject } from '@angular/core'
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop'
import { map, filter } from 'rxjs'

import { CategoryService } from '../category-list/category.service'
import { Category } from '../category-list/model/category.model'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { TransactionFormModel } from '../models/transaction-form.model'
import { TransactionType } from '../../../shared/defs/transactions'
import { TransactionService } from '../services/transaction.service'
import { AccountsService } from '../../accounts/services/accounts.service'
import { AccountDetails, AccountType } from '../../../shared/defs/accounts'
import { adjustAmountBasedOnType } from '../../../shared/utils/numbers'

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule],
})
export class TransactionFormComponent {
  private destroyRef = inject(DestroyRef)
  private transactionService = inject(TransactionService)
  private accountsService = inject(AccountsService)
  private categoryService = inject(CategoryService)
  private formBuilder = inject(FormBuilder)

  protected accountsList = toSignal(this.accountsService.accounts$)
  protected form = TransactionFormModel.getForm(this.formBuilder)
  protected data = inject<{
    type: 'todo'
    elementId: string
    title: string
  }>(MAT_DIALOG_DATA)

  categories!: Category[]
  transactionType = TransactionType

  ngOnInit() {
    this.getAllCategories()
    this.getTransactionData()
  }

  private saveForm(data: any): void {
    const transactionDetails = {
      id: this.data.elementId,
      accountName: this.accountsService.getAccountLabelById(data.accountId),
      ...data,
    }

    this.transactionService.saveDetails(transactionDetails)
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.saveForm(this.form.getRawValue())
  }

  private getTransactionData(): void {
    if (!this.data.elementId) {
      return
    }

    this.transactionService.transaction$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((transactions) =>
          transactions.filter(
            (transaction) => transaction.id === this.data.elementId
          )
        ),
        filter((data) => data.length > 0)
      )
      .subscribe((data) => {
        const { amount, categoryId, accountId, date, title, type } = data[0]

        this.form.patchValue({
          amount,
          categoryId,
          accountId,
          date,
          title,
          type,
        })
      })
  }

  private getAllCategories() {
    this.categories = this.categoryService.getAvailableCategories()
  }
}
