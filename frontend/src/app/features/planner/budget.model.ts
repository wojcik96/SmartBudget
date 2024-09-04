import { StatusType } from "../../shared/model/status-type.model";

export interface BudgetModel {
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
