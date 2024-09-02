import { Injectable } from '@angular/core';
import { BudgetModel } from './budget.model';
import { BehaviorSubject } from 'rxjs';
import { generateId } from '../../shared/utils/id-generator';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private budgetTableColumns = [
    { label: 'Category', key: 'category', width: 'col-2' },
    { label: 'Planned Amount', key: 'plannedAmount', width: 'col' },
    { label: 'Actual Expenses', key: 'actualExpenses', width: 'col' },
    { label: 'Difference', key: 'difference', width: 'col' },
    { label: 'Status', key: 'status', width: 'col-2' },
  ];
  private budgetsSubject = new BehaviorSubject<BudgetModel[]>([
    {
      id: 'hjgdsu3',
      createDate: '08.02.2024',
      category: 'Cat-1',
      currency: 'PLN',
      plannedAmount: 5000,
      actualExpenses: 250,
      difference: 4750,
      status: 'Below Budget',
    },
  ]);
  budgets$ = this.budgetsSubject.asObservable();

  addBudget({ categoryId, currency, plannedAmount }: any) {
    const newBudget: BudgetModel = {
      id: generateId('bud-'),
      createDate: new Date().toLocaleDateString(),
      category: categoryId,
      currency: currency,
      plannedAmount: plannedAmount,
      actualExpenses: 0,
      difference: 0,
      status: 'Below Budget',
    };
    this.budgetsSubject.next([...this.budgetsSubject.getValue(), newBudget]);
  }

  getBudgetsTableColumns() {
    return this.budgetTableColumns;
  }
}
