import { FormControl, FormGroup } from '@angular/forms'
import { StatusType } from '../model/status-type.model'

export type Currency = 'EUR' | 'PLN' | 'USD'

export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
}

export type AccountsForm = FormGroup<{
  name: FormControl<string>
  currency: FormControl<Currency>
  balance: FormControl<number>
  isMainAccount: FormControl<boolean>
}>

export interface AccountsFormData {
  id?: string
  name: string
  balance: number
  currency: string
  isMainAccount: boolean
}

export interface AccountDetails {
  id: string
  type: AccountType
  name: string
  balance: number
  currency: string
  createDate: string
  status?: StatusType
  lastImportDate?: string
}

export interface AccountDialogData {
  id?: string
  title: string
  type: AccountType
}
