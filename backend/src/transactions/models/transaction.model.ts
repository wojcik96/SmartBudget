export enum TransactionType {
  INCOME = 'income', 
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  createdDate: string;
  accountId: string;
  accountName: string;
  date: string;
  title: string;
  amount: number;
  categoryId: string;
  categoryName: string;
  type: TransactionType;
  currency?: string;
}

export interface TransactionFormData {
  id: string;
  date: string;
  title: string;
  amount: number;
  categoryId: string;
  accountId: string;
  accountName: string;
  type: TransactionType;
}
