import { TransactionType } from "./transaction-type.enum";

export interface Transaction {
  id: string;
  createdDate: string;
  date: string;
  title: string;
  amount: number;
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  currency?: string;
}
