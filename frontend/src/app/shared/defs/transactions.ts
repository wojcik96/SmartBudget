import { FormGroup, FormControl } from '@angular/forms'

export type TransactionForm = FormGroup<{
  title: FormControl<string | null>
  date: FormControl<string | null>
  type: FormControl<TransactionType | null>
  accountId: FormControl<string | null>
  categoryId: FormControl<string | null>
  amount: FormControl<number | null>
}>

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string
  createdDate: string
  accountId: string
  accountName: string
  date: string
  title: string
  amount: number
  categoryId: string
  categoryName: string
  type: TransactionType
  currency?: string
}

export interface TransactionFormData {
  id: string
  date: string
  title: string
  amount: number
  categoryId: string
  accountId: string
  accountName: string
  type: TransactionType
}
