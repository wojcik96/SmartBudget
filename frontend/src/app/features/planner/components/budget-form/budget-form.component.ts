import { Component, DestroyRef, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { CategoryService } from '../../../transaction/category-list/category.service'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { PlannerService } from '../../services/planner.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { map, filter } from 'rxjs'
import { Currency } from '../../../../shared/defs/accounts'
import { BudgetFormModel } from '../../models/budget-form.model'

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss',
})
export class BudgetFormComponent {
  private destroyRef = inject(DestroyRef)
  private plannerService = inject(PlannerService)
  private formBuilder = inject(FormBuilder)
  private categoryService = inject(CategoryService)

  protected categories: any[] = []
  protected form = BudgetFormModel.getForm(this.formBuilder)
  protected data = inject<{
    elementId: string
    title: string
  }>(MAT_DIALOG_DATA)

  ngOnInit() {
    this.categories = this.categoryService.getAvailableCategories()
    this.getBudgetData();
  }

  private saveForm(data: any): void {
    const budgetDetails = {
      id: this.data.elementId,
      ...data,
    }

    this.plannerService.saveDetails(budgetDetails)
  }

  private getBudgetData(): void {

    console.log(this.data.elementId);
    
    if (!this.data.elementId) {
      return
    }

    this.plannerService.budgetsSummary$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((budgets) =>
          budgets.filter((budget) => budget.id === this.data.elementId)
        ),
        filter((data) => data.length > 0)
      )
      .subscribe((data) => {
        const { categoryId, currency, plannedAmount } = data[0]

        this.form.patchValue({
          categoryId,
          currency,
          plannedAmount,
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
