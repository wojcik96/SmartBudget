import { FormGroup, FormControl } from '@angular/forms'
import { StatusType } from '../model/status-type.model'

export type BudgetForm = FormGroup<{
  currency: FormControl<string | null>
  categoryId: FormControl<string | null>
  plannedAmount: FormControl<number | null>
}>

export interface Budget {
    id: string;
    createDate: string;
    categoryName: string;
    categoryId: string;
    currency: string;
    plannedAmount: number;
    actualExpenses: number;
    difference: number;
    status: StatusType;
  }


export interface BudgetFormData {
    id?: string,
    categoryId: string,
    currency: string,
    plannedAmount: number
}

export type BudgetBarItem = {
    category: string,
    categoryId: string,
    amount: number,
    spent: number,
    progress: number,
    progressColor: string,
    currency: string
  }