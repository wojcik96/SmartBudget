import { FormBuilder, Validators } from '@angular/forms'
import { AccountsForm, Currency } from '../../../shared/defs/accounts'

export class AccountsFormModel {
  static getForm(formBuilder: FormBuilder): AccountsForm {
    return formBuilder.group({
      name: ['', Validators.required],
      currency: formBuilder.control<Currency>('PLN'),
      amount: [
        0,
        [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      ],
    })
  }
}
    