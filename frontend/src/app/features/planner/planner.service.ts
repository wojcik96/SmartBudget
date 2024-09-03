import { Injectable, OnDestroy } from '@angular/core';
import { BudgetModel } from './budget.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { generateId } from '../../shared/utils/id-generator';
import { Categories } from '../../shared/model/category.enum';
import { CategoryService } from '../transaction/category-list/category.service';
import { loadDataFromLS, saveDataToLS } from '../../shared/utils/localStorage';

type newBudgetType = {
  categoryId: string;
  currency: string;
  plannedAmount: number;
};

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private budgetTableColumns = [
    { label: 'Category', key: 'categoryName', width: 'col-2' },
    { label: 'Planned Amount', key: 'plannedAmount', width: 'col' },
    { label: 'Actual Expenses', key: 'actualExpenses', width: 'col' },
    { label: 'Difference', key: 'difference', width: 'col' },
    { label: 'Status', key: 'status', width: 'col-2' },
  ];
  private SUMMARY_MAP_KEY = 'SmBu-budSub';
  private budgetsSummaryMap = loadDataFromLS(this.SUMMARY_MAP_KEY) || [];
  private budgetsSummarySubject = new BehaviorSubject<BudgetModel[]>(
    this.budgetsSummaryMap
  );
  budgetsSummary$ = this.budgetsSummarySubject.asObservable();

  constructor(private categoryService: CategoryService) {
    this.categoryService.categorySumarry$.subscribe(() => {
      this.updateBudgets();
    });
  }

  addBudget({ categoryId, currency, plannedAmount }: newBudgetType) {
    const actualExpenses =
      this.categoryService.getCategoryAmountById(categoryId);
    const difference = this.countDifference(plannedAmount, actualExpenses);
    const newBudget: BudgetModel = {
      id: generateId('bud-'),
      createDate: new Date().toLocaleDateString(),
      categoryName: Categories[categoryId as keyof typeof Categories],
      categoryId: categoryId,
      currency: currency,
      plannedAmount: plannedAmount,
      actualExpenses: actualExpenses,
      difference: difference,
      status: this.setStatus(difference),
    };

    this.budgetsSummarySubject.next([
      ...this.budgetsSummarySubject.getValue(),
      newBudget,
    ]);

    saveDataToLS(this.SUMMARY_MAP_KEY, this.budgetsSummarySubject.value);
  }

  private updateBudgets() {
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

  getBudgetsTableColumns() {
    return this.budgetTableColumns;
  }

  setStatus(difference: number) {
    return difference >= 0 ? 'Below Budget' : 'Over Budget';
  }

  countDifference(a: number, b: number) {
    return Number((a + b).toFixed(2));
  }
}
