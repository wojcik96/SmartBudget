import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { catchError, EMPTY, tap } from 'rxjs'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { AccountsFormModel } from '../../models/accounts-form.model'
import { AccountDialogData, Currency } from '../../../../shared/defs/accounts'
import { AppDataService } from '../../../../shared/services/app-data.service'
import { AccountsRequestService } from '../../services/accounts-request.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component'
import { DialogRef } from '@angular/cdk/dialog'

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
    MatCheckboxModule,
    SpinnerComponent,
  ],
})
export class AccountsFormComponent {
  private destroyRef = inject(DestroyRef)
  private dialogRef = inject(DialogRef)
  private formBuilder = inject(NonNullableFormBuilder)
  private appDataService = inject(AppDataService)
  private accountsReqService = inject(AccountsRequestService)
  private toastService = inject(ToastService)

  protected form = AccountsFormModel.getForm(this.formBuilder)
  protected accountList = this.appDataService.accountsList
  protected isLoading = signal(false)
  protected data = inject<AccountDialogData>(MAT_DIALOG_DATA)
  protected selectedAccount = computed(() =>
    this.accountList()?.find((account) => account.id === this.data.id)
  )

  constructor() {
    effect(() => {
      const selectedAccount = this.selectedAccount()

      if (selectedAccount) {
        this.form.patchValue({
          ...selectedAccount,
          currency: selectedAccount.currency as Currency,
        })
      }
    })
  }

  private saveForm(data: any): void {
    this.isLoading.set(true)

    const accountDetails = {
      type: this.data.type,
      ...this.selectedAccount(),
      ...data,
    }

    this.accountsReqService
      .create(accountDetails)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.isLoading.set(false)
          this.openSuccessToast()
        })
      )
      .subscribe((accountList) => {
        this.appDataService.accountsListUpdate(accountList)
        this.dialogRef.close()
      })
  }

  private openSuccessToast(): void {
    this.toastService.openSuccessToast(
      'You have successfully saved the account!',
      'success',
      {
        horizontalPosition: 'right',
        duration: 3000,
      }
    )
  }

  private openErrorToast(): void {
    this.toastService.openSuccessToast(
      'Something went wrong. The account could not be saved.',
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
