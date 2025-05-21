import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { CategoriesService } from 'src/categories/categories.service';
import { StatusOption } from 'src/accounts/models/accounts';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { JwtUser } from 'src/auth/models/jwt-user';
import { UsersService } from 'src/users/users.service';
import { Budget } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepo: Repository<Budget>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly categoryService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  async create(
    createBudgetDto: CreateBudgetDto,
    jwtUser: JwtUser,
  ): Promise<Budget[]> {
    const user = await this.userService.getUserFromJwt(jwtUser);
    const category = await this.categoryRepo.findOne({
      where: { id: createBudgetDto.categoryId },
    });

    const budget = this.budgetRepo.create({
      category,
      plannedDate: createBudgetDto.plannedDate,
      plannedAmount: createBudgetDto.plannedAmount,
      user,
    });
    await this.budgetRepo.save(budget);
    
    return this.getAll(jwtUser);
  }

  // TODO: AddUpData method

  async remove(id: string, jwtUser: JwtUser): Promise<Budget[]> {
    await this.budgetRepo.delete(id);

    return this.getAll(jwtUser);
  }

  // async getAll(jwtUser: JwtUser): Promise<any[]> {
  //   const user = await this.userService.getUserFromJwt(jwtUser);

  //   const budgets = await this.budgetRepo.find({
  //     where: { user },
  //     relations: ['category'],
  //   });

  //   return budgets.map((budget) => ({
  //     id: budget.id,
  //     plannedAmount: budget.plannedAmount,
  //     plannedDate: budget.plannedDate,
  //     categoryId: budget.category.id,
  //     categoryName: budget.category.name,
  //     difference: 0,
  //     totalIncome: 0,
  //     status: this.setStatus(0),
  //   }));
  // }

  async getAll(jwtUser: JwtUser): Promise<any> {
    const budgets = await this.budgetRepo.find({
      where: { user: { id: jwtUser.sub } },
    });

    return Promise.all(
      budgets.map(async (budget) => {
        const date = new Date(budget.plannedDate);
        const difference = await this.calculateBudgetDifference(budget);
        return {
          id: budget.id,
          categoryName: budget.category.name,
          plannedAmount: budget.plannedAmount,
          status: this.setStatus(difference, budget.plannedAmount),
          actualExpenses: await this.getTotalExpenseForCategory(
            budget.category.id,
            date.getFullYear(),
            date.getMonth() + 1,
          ),
          difference,
        };
      }),
    );
  }

  async getTotalExpenseForCategory(
    categoryId: string,
    year: number,
    month: number,
  ): Promise<number> {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

    const total = await this.transactionRepo
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'total')
      .where('transaction.categoryId = :categoryId', { categoryId })
      .andWhere('transaction.type = :type', { type: 'expense' })
      .andWhere('transaction.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();

    return Number(total?.total) || 0;
  }

  async calculateBudgetDifference(budget: Budget): Promise<number> {
    const date = new Date(budget.plannedDate);
    const expense = await this.getTotalExpenseForCategory(
      budget.category.id,
      date.getFullYear(),
      date.getMonth() + 1,
    );

    return Number(budget.plannedAmount) - expense;
  }
  private setStatus(difference: number, plannedAmount: number) {
    if (difference >= 0) {
      return { type: StatusOption.SUCCESS, label: 'Below Budget' };
    } else if ((difference = plannedAmount)) {
      return { type: StatusOption.PERFECT, label: 'Perfect!' };
    } else {
      return { type: StatusOption.ERROR, label: 'Over Budget' };
    }
  }
}
