import { Category } from "./category.model";

export interface CategorySummary extends Category{
  amount: number;
  currency?: string;
}
