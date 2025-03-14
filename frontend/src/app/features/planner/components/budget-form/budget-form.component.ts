import { Component, DestroyRef, effect, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { CategoryService } from '../../../transaction/category-list/category.service'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { catchError, EMPTY, tap } from 'rxjs'
import { BudgetFormModel } from '../../models/budget-form.model'
import { BudgetRequestService } from '../../services/budget-request.service'
import { AppDataService } from '../../../../shared/services/app-data.service'
import { ToastService } from '../../../../shared/services/toast.service'
import { DialogRef } from '@angular/cdk/dialog'
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    SpinnerComponent,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss',
})
export class BudgetFormComponent {
  private destroyRef = inject(DestroyRef)
  private dialogRef = inject(DialogRef)
  private budgetReqService = inject(BudgetRequestService)
  private appDataService = inject(AppDataService)
  private toastService = inject(ToastService)

  private categoryService = inject(CategoryService)
  private formBuilder = inject(FormBuilder)

  protected budgetList = this.appDataService.budgetList
  protected categoriesList = this.appDataService.categoriesList
  protected accountsList = this.appDataService.accountsList
  protected isLoading = signal(false)
  protected form = BudgetFormModel.getForm(this.formBuilder)
  protected data = inject<{
    elementId: string
    title: string
  }>(MAT_DIALOG_DATA)

  ngOnInit() {
    this.getDetails()
  }

  private saveForm(data: any): void {
    this.isLoading.set(true)

    const budgetDetails = {
      id: this.data.elementId,
      ...data,
    }

    this.budgetReqService
      .create(budgetDetails)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.isLoading.set(true)
          this.openSuccessToast()
        })
      )
      .subscribe((budgetList) => {
        this.appDataService.budgetListUpdate(budgetList)
      })
  }

  private getDetails(): void {
    const selectedBudget = this.budgetList()?.find(
      (budget) => budget.id === this.data.elementId
    )

    if (!selectedBudget) return

    this.form.patchValue({ ...selectedBudget })
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
