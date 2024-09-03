import { Injectable } from '@angular/core'

import { Category } from './model/category.model'
import { CategorySummary } from './model/category-summary.model'
import { BehaviorSubject } from 'rxjs'
import { loadDataFromLS, saveDataToLS } from '../../../shared/utils/localStorage'
import { Categories } from '../../../shared/model/category.enum'

type CategorySummaryMapType = { [key: string]: CategorySummary }

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private CATEGORY_SUMMARY_KEY = 'SmBu-catSumm'
  private categorySummaryMap = loadDataFromLS(this.CATEGORY_SUMMARY_KEY) || this.getDefaultCategorySummary()
  private categorySummarySubject = new BehaviorSubject<CategorySummaryMapType>(
    this.categorySummaryMap
  )
  categorySumarry$ = this.categorySummarySubject.asObservable()

  getAvailableCategories(): Category[] {
    return this.allCategories
  }

  getAllCategorySummaries(): CategorySummary[] {
    return Object.values(this.categorySummaryMap)
  }

  getCategoryLabelById(categoryId: string): string {
    return (
      this.allCategories.find((category) => category.id === categoryId)
        ?.label || ''
    )
  }

  updateCategoryAmount(categoryId: string, amount: number) {
    const currentMap = this.categorySummarySubject.value

    if (currentMap[categoryId]) {
      currentMap[categoryId].amount += amount
      this.categorySummarySubject.next(currentMap)
      saveDataToLS(this.CATEGORY_SUMMARY_KEY, currentMap)
    }
  }

  getCategoryAmountById(categoryId: string) {
    return this.categorySummaryMap[categoryId].amount
  }

  getIncomeValue() {
    return this.categorySummarySubject.value['cat-1'].amount;
  }
  
  getAllExpenses() {
    let allExpenses = 0; 
    for (const [key, value] of Object.entries(this.categorySummarySubject.value)) {
      if (value.amount < 0) allExpenses += value.amount; 
    }

    return allExpenses;
  }

  // TODO: Wywalić na backend
  private allCategories: Category[] = [
    {
      id: 'cat-1',
      label: Categories['cat-1'],
      icon: 'bi bi-plus-circle-dotted',
      color: '#28a745',
    },
    {
      id: 'cat-2',
      label: Categories['cat-2'],
      icon: 'bi bi-cart',
      color: '#dc3545',
    },
    {
      id: 'cat-3',
      label: Categories['cat-3'],
      icon: 'bi bi-house',
      color: '#ffc107',
    },
    {
      id: 'cat-4',
      label: Categories['cat-4'],
      icon: 'bi bi-car',
      color: '#17a2b8',
    },
    {
      id: 'cat-5',
      label: Categories['cat-5'],
      icon: 'bi bi-heart',
      color: '#fd7e14',
    },
    {
      id: 'cat-6',
      label: Categories['cat-6'],
      icon: 'bi bi-bank',
      color: '#6f42c1',
    },
    {
      id: 'cat-7',
      label: Categories['cat-7'],
      icon: 'bi bi-film',
      color: '#20c997',
    },
    {
      id: 'cat-8',
      label: Categories['cat-8'],
      icon: 'bi bi-shield-lock',
      color: '#343a40',
    },
    {
      id: 'cat-9',
      label: Categories['cat-9'],
      icon: 'bi bi-person-heart',
      color: '#007bff',
    },
    {
      id: 'cat-10',
      label: Categories['cat-10'],
      icon: 'bi bi-briefcase',
      color: '#6610f2',
    },
  ]

  private getDefaultCategorySummary(): CategorySummaryMapType {
    return {
      'cat-1': {
        id: 'cat-1',
        label: Categories['cat-1'],
        icon: 'bi bi-plus-circle-dotted',
        amount: 0,
      },
      'cat-2': {
        id: 'cat-2',
        label: Categories['cat-2'],
        icon: 'bi bi-cart',
        amount: 0,
      },
      'cat-3': {
        id: 'cat-3',
        label: Categories['cat-3'],
        icon: 'bi bi-house',
        amount: 0,
      },
      'cat-4': {
        id: 'cat-4',
        label: Categories['cat-4'],
        icon: 'bi bi-shield-lock',
        amount: 0,
      },
      'cat-5': {
        id: 'cat-5',
        label: Categories['cat-5'],
        icon: 'bi bi-car-front',
        amount: 0,
      },
      'cat-6': {
        id: Categories['cat-6'],
        label: 'Work',
        icon: 'bi bi-briefcase',
        amount: 0,
      },
      'cat-7': {
        id: 'cat-7',
        label: Categories['cat-7'],
        icon: 'bi bi-heart',
        amount: 0,
      },
      'cat-8': {
        id: 'cat-8',
        label: Categories['cat-8'],
        icon: 'bi bi-person-heart',
        amount: 0,
      },
      'cat-9': {
        id: 'cat-9',
        label: Categories['cat-9'],
        icon: 'bi bi-film',
        amount: 0,
      },
      'cat-10': {
        id: 'cat-10',
        label: Categories['cat-10'],
        icon: 'bi bi-bank',
        amount: 0,
      },
    }
  }
}
