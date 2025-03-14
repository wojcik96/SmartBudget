import { FormBuilder, Validators } from '@angular/forms'
import { BudgetForm } from '../../../shared/defs/budgets'

export class BudgetFormModel {
  static getForm(formBuilder: FormBuilder): BudgetForm {
    return formBuilder.group({
      categoryId: ['', Validators.required],
      plannedDate: ['', Validators.required],
      plannedAmount: [
        0,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      ],
    })
  }
}
