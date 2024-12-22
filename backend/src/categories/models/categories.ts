export enum Categories {
  'cat-1' = 'Income',
  'cat-2' = 'Shopping',
  'cat-3' = 'Housing',
  'cat-4' = 'Insurance',
  'cat-5' = 'Transport',
  'cat-6' = 'Work',
  'cat-7' = 'Health',
  'cat-8' = 'Family',
  'cat-9' = 'Entertainment',
  'cat-10' = 'Savings',
}

export interface Category {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface CategorySummary extends Category {
  amount: number;
  currency?: string;
}

export type CategorySummaryMapType = { [key: string]: CategorySummary };
