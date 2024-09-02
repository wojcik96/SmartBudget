export interface BudgetModel {
  id: string;
  createDate: string;
  category: string;
  currency: string;
  plannedAmount: number;
  actualExpenses: number;
  difference: number;
  status: string;
}
