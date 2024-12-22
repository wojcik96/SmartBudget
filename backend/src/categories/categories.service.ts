import { Injectable } from '@nestjs/common';
import {
  Categories,
  Category,
  CategorySummaryMapType,
} from './models/categories';
import { categorySummaryMap } from './data/categorySummaryMap';
import { allCategories } from './data/allCategories';

@Injectable()
export class CategoriesService {
  private allCategoriesSummary = categorySummaryMap;
  private allCategories = allCategories;

  public getAllCategories(): Category[] {
    return this.allCategories;
  }

  public getAllCategoriesSummary(): CategorySummaryMapType {
    return this.allCategoriesSummary;
  }

  public getCategoryLabelById(categoryId: string): string {
    return (
      this.allCategories.find((category) => category.id === categoryId)
        ?.label || ''
    );
  }

  public getCategoryColorById(categoryId: string): string {
    return (
      this.allCategories.find((category) => category.id === categoryId)
        ?.color || ''
    );
  }

  public getCategoryAmountById(categoryId: string) {
    return this.allCategoriesSummary[categoryId].amount;
  }

  private getDefaultCategorySummary(): CategorySummaryMapType {
    return this.allCategoriesSummary;
  }
}
