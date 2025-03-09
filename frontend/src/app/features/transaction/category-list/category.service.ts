import { computed, effect, inject, Injectable, signal } from '@angular/core'
import { Category } from './model/category.model'
import { CategorySummary } from './model/category-summary.model'
import { Categories } from '../../../shared/model/category.enum'
import { AppDataService } from '../../../shared/services/app-data.service'

type CategorySummaryMapType = { [key: string]: CategorySummary }

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private appDataService = inject(AppDataService)
  private transactionList = this.appDataService.transactionsList
  private allCategories = this.appDataService.categoriesList

  private getDefaultCategorySummary = (): CategorySummaryMapType => ({
    'cat-1': {
      id: 'cat-1',
      name: 'Food',
      icon: 'bi bi-plus-circle-dotted',
      amount: 0,
    },
    'cat-2': { id: 'cat-2', name: 'Shopping', icon: 'bi bi-cart', amount: 0 },
    'cat-3': { id: 'cat-3', name: 'Home', icon: 'bi bi-house', amount: 0 },
    'cat-4': {
      id: 'cat-4',
      name: 'Security',
      icon: 'bi bi-shield-lock',
      amount: 0,
    },
    'cat-5': {
      id: 'cat-5',
      name: 'Transport',
      icon: 'bi bi-car-front',
      amount: 0,
    },
    'cat-6': { id: 'cat-6', name: 'Work', icon: 'bi bi-briefcase', amount: 0 },
    'cat-7': { id: 'cat-7', name: 'Health', icon: 'bi bi-heart', amount: 0 },
    'cat-8': {
      id: 'cat-8',
      name: 'Personal',
      icon: 'bi bi-person-heart',
      amount: 0,
    },
    'cat-9': {
      id: 'cat-9',
      name: 'Entertainment',
      icon: 'bi bi-film',
      amount: 0,
    },
    'cat-10': { id: 'cat-10', name: 'Finance', icon: 'bi bi-bank', amount: 0 },
  })

  public categorySummary = computed(() => {
    const summary = this.getDefaultCategorySummary()

    this.transactionList().forEach((transaction) => {
      if (summary[transaction.categoryId]) {
        summary[transaction.categoryId].amount += transaction.amount
      }
    })

    return summary
  })

  public allCategorySummaries = computed(() => {
    return Object.values(this.categorySummary())
  })

  public getCategoryAmountById(categoryId: string) {
    return this.categorySummary()[categoryId].amount
  }

  // TODO: MOże da się to jakoś połączyć w jeden response z API?
  // TODO: Zmienić na odcztywanie z API
  getAvailableCategories(): Category[] {
    return this.allCategories() || []
  }
  // TODO: Zmienić na odcztywanie z API

  getCategoryLabelById(categoryId: string): string {
    // TODO: Jest wykorzystane w Planner
    // TODO: Fajnie, tylko do czego? Nie da się inaczej?
    return (
      this.allCategories()?.find((category) => category.id === categoryId)
        ?.name || ''
    )
  }


}
