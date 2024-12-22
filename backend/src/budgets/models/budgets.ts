import { StatusType } from 'src/accounts/models/accounts';

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