import { FormControl, FormGroup } from '@angular/forms'
import { StatusType } from '../model/status-type.model'

export type Currency = 'EUR' | 'PLN' | 'USD'

export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
}

export type AccountsForm = FormGroup<{
  name: FormControl<string | null>
  currency: FormControl<Currency | null>
  amount: FormControl<number | null>
}>

export interface AccountsFormData {
  id?: string
  name: string
  amount: number
  currency: string
}

export interface AccountDetails {
  id: string
  accountType: AccountType
  name: string
  balance: number
  currency: string
  createDate: string
  status?: StatusType
  lastImportDate?: string
}
