import { Injectable } from '@nestjs/common';
import { Categories, CategorySummaryMapType } from './models/categories';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { TransactionsService } from '../transactions/transactions.service'; // Adjust the path as necessary
import { JwtUser } from 'src/auth/models/jwt-user';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private transactionsService: TransactionsService,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoriesWithExpenses(jwtUser: JwtUser): Promise<any[]> {
    const categories = await this.getAllCategories();
    const categoryExpenses =
      await this.transactionsService.getCategoryExpenses(jwtUser);

    const categoryMap = categories.reduce((acc, category) => {
      const categoryExpense = categoryExpenses.find(
        (expense) => expense.categoryId === category.id,
      );

      acc.push({
        id: category.id,
        name: category.name,
        icon: category.icon,
        amount: categoryExpense ? categoryExpense.amount : 0, // Jeśli brak transakcji, 0
      });

      return acc;
    }, []);

    return categoryMap;
  }

  // public getAllCategoriesSummary(): CategorySummaryMapType {
  //   return this.allCategoriesSummary;
  // }

  // public getCategoryLabelById(categoryId: string): string {
  //   return (
  //     this.allCategories.find((category) => category.id === categoryId)
  //       ?.label || ''
  //   );
  // }

  // public getCategoryColorById(categoryId: string): string {
  //   return (
  //     this.allCategories.find((category) => category.id === categoryId)
  //       ?.color || ''
  //   );
  // }

  // public getCategoryAmountById(categoryId: string) {
  //   return this.allCategoriesSummary[categoryId].amount;
  // }

  // private getDefaultCategorySummary(): CategorySummaryMapType {
  //   return this.allCategoriesSummary;
  // }
}
