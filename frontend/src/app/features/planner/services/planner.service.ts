import { inject, Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { StatusOption } from '../../../shared/model/status-type.model'
import { ColumnType } from '../../../shared/model/table-config.model'
import { generateId } from '../../../shared/utils/id-generator'
import {
  loadDataFromLS,
  saveDataToLS,
} from '../../../shared/utils/localStorage'
import { CategoryService } from '../../transaction/category-list/category.service'
import { Budget, BudgetFormData } from '../../../shared/defs/budgets'

type newBudgetType = {
  categoryId: string
  currency: string
  plannedAmount: number
}

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private categoryService = inject(CategoryService)

  private budgetTableColumns = [
    {
      label: 'Category',
      key: 'categoryName',
      cssClass: 'col-2',
      type: ColumnType.NAME,
    },
    {
      label: 'Planned Amount',
      key: 'plannedAmount',
      cssClass: 'col',
      type: ColumnType.CURRENCY,
    },
    {
      label: 'Actual Expenses',
      key: 'actualExpenses',
      cssClass: 'col',
      type: ColumnType.CURRENCY,
    },
    {
      label: 'Difference',
      key: 'difference',
      cssClass: 'col',
      type: ColumnType.CURRENCY,
    },
    {
      label: 'Status',
      key: 'status',
      cssClass: 'col-2',
      type: ColumnType.STATUS,
    },
  ]
  private SUMMARY_MAP_KEY = 'SmBu-budSub'
  private budgetsSummaryMap = loadDataFromLS(this.SUMMARY_MAP_KEY) || []
  private budgetsSummarySubject = new BehaviorSubject<Budget[]>(
    this.budgetsSummaryMap
  )
  budgetsSummary$ = this.budgetsSummarySubject.asObservable()

  constructor() {
    this.categoryService.categorySummary$.subscribe(() => {
      this.updateBudgetsData();
    });
  }

  // private addBudget({ categoryId, currency, plannedAmount }: newBudgetType) {

  //   const newBudget: BudgetModel = {
  //     id: generateId('bud-'),
  //     createDate: new Date().toLocaleDateString(),
  //     categoryName: Categories[categoryId as keyof typeof Categories],
  //     categoryId: categoryId,
  //     currency: currency,
  //     plannedAmount: plannedAmount,
  //     actualExpenses: actualExpenses,
  //     difference: difference,
  //     status: this.setStatus(difference),
  //   };

  //   this.budgetsSummarySubject.next([
  //     ...this.budgetsSummarySubject.getValue(),
  //     newBudget,
  //   ]);

  //   saveDataToLS(this.SUMMARY_MAP_KEY, this.budgetsSummarySubject.value);
  // }

  private updateBudgetsData() {
    const updatedBudgets = this.budgetsSummarySubject.value.map((budget) => {
      const actualExpenses = this.categoryService.getCategoryAmountById(
        budget.categoryId
      );
      const difference = this.countDifference(
        budget.plannedAmount,
        actualExpenses
      );
      return {
        ...budget,
        actualExpenses,
        difference,
        status: this.setStatus(difference),
      };
    });
    this.budgetsSummarySubject.next(updatedBudgets);
  }

  private addBudget(data: BudgetFormData): void {
    const actualExpenses = this.categoryService.getCategoryAmountById(
      data.categoryId
    )
    const difference = this.countDifference(data.plannedAmount, actualExpenses)
    const newEntry: Budget = {
      id: generateId('bud-'),
      createDate: new Date().toLocaleDateString(),
      categoryName: this.categoryService.getCategoryLabelById(data.categoryId),
      categoryId: data.categoryId,
      currency: data.currency,
      plannedAmount: data.plannedAmount,
      actualExpenses: actualExpenses,
      difference: difference,
      status: this.setStatus(difference),
    }

    this.budgetsSummarySubject.next([
      ...this.budgetsSummarySubject.getValue(),
      newEntry,
    ])
    saveDataToLS(this.SUMMARY_MAP_KEY, this.budgetsSummarySubject.value)
  }

  private updateBudgets(data: BudgetFormData): void {
    const updatedBudgets = this.budgetsSummarySubject
      .getValue()
      .map((budget) => {
        if (budget.id === data.id) {
          return {
            ...budget,
            categoryName: this.categoryService.getCategoryLabelById(
              data.categoryId
            ),
            categoryId: data.categoryId,
            currency: data.currency,
            plannedAmount: data.plannedAmount,
          }
        }
        return budget
      })

    this.budgetsSummarySubject.next(updatedBudgets)
    saveDataToLS(this.SUMMARY_MAP_KEY, this.budgetsSummarySubject.value)
  }

  public saveDetails(data: BudgetFormData): void {
    if (data.id) {
      this.updateBudgets(data)
    } else {
      this.addBudget(data)
    }
  }

  public removeBudget(accountId: string): void {
    const updatedAccounts = this.budgetsSummarySubject
      .getValue()
      .filter((account) => account.id !== accountId)

    this.budgetsSummarySubject.next(updatedAccounts)
    saveDataToLS(this.SUMMARY_MAP_KEY, this.budgetsSummarySubject.value)
  }

  getBudgetsTableColumns() {
    return this.budgetTableColumns
  }

  setStatus(difference: number) {
    return difference >= 0
      ? { type: StatusOption.SUCCESS, label: 'Below Budget' }
      : { type: StatusOption.ERROR, label: 'Over Budget' }
  }

  countDifference(a: number, b: number) {
    return Number((a + b).toFixed(2))
  }
}
