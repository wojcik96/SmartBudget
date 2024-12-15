import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { filter, map } from 'rxjs'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { AccountsFormModel } from '../../models/accounts-form.model'
import { AccountType, Currency } from '../../../../shared/defs/accounts'
import { AccountsService } from '../../services/accounts.service'

@Component({
  selector: 'app-accounts-form',
  standalone: true,
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class AccountsFormComponent implements OnInit {
  private destroyRef = inject(DestroyRef)
  private accountsService = inject(AccountsService)
  private formBuilder = inject(FormBuilder)

  protected form = AccountsFormModel.getForm(this.formBuilder)
  protected data = inject<{
    type: AccountType
    productId: string
    title: string
  }>(MAT_DIALOG_DATA)

  ngOnInit(): void {
    this.getAccountData()
  }

  private saveForm(data: any): void {
    const accountDetails = {
      id: this.data.productId,
      ...data,
    }

    this.accountsService.saveDetails(this.data.type, accountDetails)
  }

  private getAccountData(): void {
    if (!this.data.productId) {
      return
    }

    this.accountsService.accounts$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((accounts) =>
          accounts.filter((account) => account.id === this.data.productId)
        ),
        filter((data) => data.length > 0)
      )
      .subscribe((data) => {
        const { balance, currency, name } = data[0]

        this.form.patchValue({
          amount: balance,
          currency: currency as Currency,
          name: name,
        })
      })
  }

  public onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.saveForm(this.form.getRawValue())
  }
}
