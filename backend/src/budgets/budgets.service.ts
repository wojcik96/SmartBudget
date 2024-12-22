import { Injectable } from '@nestjs/common';
import { Budget, BudgetFormData } from './models/budgets';
import { CategoriesService } from 'src/categories/categories.service';
import { generateId } from 'src/utils/id-generator';
import { StatusOption } from 'src/accounts/models/accounts';

@Injectable()
export class BudgetsService {
  private budgetsList: Budget[] = [];

  constructor(private categoryService: CategoriesService) {}

  public getAllBudgets(): Budget[] {
    return this.budgetsList;
  }

  public addBudget(data: BudgetFormData): void {
    const actualExpenses = this.categoryService.getCategoryAmountById(
      data.categoryId,
    );
    const difference = this.countDifference(data.plannedAmount, actualExpenses);
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
    };

    this.budgetsList.push(newEntry);
  }

  public updateBudget(data: BudgetFormData): void {
    this.budgetsList = this.budgetsList.map((budget) => {
      if (budget.id === data.id) {
        return {
          ...budget,
          categoryName: this.categoryService.getCategoryLabelById(
            data.categoryId,
          ),
          categoryId: data.categoryId,
          currency: data.currency,
          plannedAmount: data.plannedAmount,
        };
      }
      return budget;
    });
  }

  public removeBudget(accountId: string): void {
    this.budgetsList = this.budgetsList.filter(
      (account) => account.id !== accountId,
    );
  }

  private countDifference(a: number, b: number) {
    return Number((a + b).toFixed(2));
  }

  private setStatus(difference: number) {
    return difference >= 0
      ? { type: StatusOption.SUCCESS, label: 'Below Budget' }
      : { type: StatusOption.ERROR, label: 'Over Budget' };
  }
}
