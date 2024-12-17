import { FormBuilder, Validators } from '@angular/forms'
import { TransactionForm, TransactionType } from '../../../shared/defs/transactions'


export class TransactionFormModel {
  static getForm(formBuilder: FormBuilder): TransactionForm {
    return formBuilder.group({
        title: ['', Validators.required],
        date: ['', Validators.required],
        type: ['income' as TransactionType, Validators.required],
        accountId: ['', Validators.required],
        categoryId: ['cat-1', Validators.required],
        amount: [
          0,
          [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
        ],
    })
  }
}
