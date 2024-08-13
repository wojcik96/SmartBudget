import { Injectable } from '@angular/core';

import { Category } from './model/category.model';
import { CategorySummary } from './model/category-summary.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // TODO - from backend
  private allCategories: Category[] = [
    { id: 'cat-1', label: 'Przychody', icon: 'bi bi-plus-circle-dotted', color: '#28a745'},
    { id: 'cat-2', label: 'Zakupy', icon: 'bi bi-cart', color: '#dc3545' },
    { id: 'cat-3', label: 'Mieszkanie', icon: 'bi bi-house', color: '#ffc107' },
    { id: 'cat-4', label: 'Transport', icon: 'bi bi-car', color: '#17a2b8' },
    { id: 'cat-5', label: 'Zdrowie', icon: 'bi bi-heart', color: '#fd7e14' },
    { id: 'cat-6', label: 'Oszczędności', icon: 'bi bi-bank', color: '#6f42c1' },
    { id: 'cat-7', label: 'Rozrywka', icon: 'bi bi-film', color: '#20c997' },
    { id: 'cat-8', label: 'Ubezpieczenia', icon: 'bi bi-shield-lock', color: '#343a40' },
    { id: 'cat-9', label: 'Rodzina', icon: 'bi bi-person-heart', color: '#007bff' },
    { id: 'cat-10', label: 'Praca', icon: 'bi bi-briefcase', color: '#6610f2' },
  ];

  // TODO - from backend
  private categorySummaryMap: { [key: string]: CategorySummary } = {
    'cat-1': { id: 'cat-1', label: 'Przychody', icon: 'bi bi-plus-circle-dotted', amount: 0 },
    'cat-2': { id: 'cat-2', label: 'Zakupy', icon: 'bi bi-cart', amount: 0 },
    'cat-3': { id: 'cat-3', label: 'Mieszkanie', icon: 'bi bi-house', amount: 0 },
    'cat-4': { id: 'cat-4', label: 'Ubezpieczenia', icon: 'bi bi-shield-lock', amount: 0 },
    'cat-5': { id: 'cat-5', label: 'Transport', icon: 'bi bi-car-front', amount: 0 },
    'cat-6': { id: 'cat-6', label: 'Praca', icon: 'bi bi-briefcase', amount: 0 },
    'cat-7': { id: 'cat-7', label: 'Zdrowie', icon: 'bi bi-heart', amount: 0 },
    'cat-8': { id: 'cat-8', label: 'Rodzina', icon: 'bi bi-person-heart', amount: 0 },
    'cat-9': { id: 'cat-9', label: 'Rozrywka', icon: 'bi bi-film', amount: 0 },
    'cat-10': { id: 'cat-10', label: 'Oszczędności', icon: 'bi bi-bank', amount: 0 }
  };

  getAvailableCategories(): Category[] {
    return this.allCategories;
  } 

  getAllCategorySummaries(): CategorySummary[] {
    return Object.values(this.categorySummaryMap);
  }

  getCategoryLabelById(categoryId: string): string {
    return this.allCategories.find(category => category.id === categoryId)?.label || '';
  }

  updateCategoryAmount(categoryId: string, amount: number) {
    this.categorySummaryMap[categoryId].amount += amount;
  }

  constructor() { }
}
