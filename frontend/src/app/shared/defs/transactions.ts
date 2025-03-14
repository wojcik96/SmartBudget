import { FormGroup, FormControl } from '@angular/forms'

export type TransactionForm = FormGroup<{
  id: FormControl<string | null>
  name: FormControl<string | null>
  amount: FormControl<number | null>
  date: FormControl<string | null>
  type: FormControl<TransactionType | null>
  accountId: FormControl<string | null>
  categoryId: FormControl<string | null>
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
  name: string
  amount: number
  categoryId: string
  categoryName: string
  type: TransactionType
  currency?: string
}

export interface TransactionFormData {
  id: string
  date: string
  name: string
  amount: number
  categoryId: string
  accountId: string
  accountName: string
  type: TransactionType
}

export interface UpdateTransactionDto {
  id: string | null
  name: string | null
  amount: number | null
  date: string | null
  type: TransactionType | null
  accountId: string | null
  categoryId: string | null
}

export interface CreateTransactionDto {
  name: string | null
  amount: number | null
  date: string | null
  type: TransactionType | null
  accountId: string | null
  categoryId: string | null
}

export interface TransactionDialogData {
  elementId?: string
  title: string
}
