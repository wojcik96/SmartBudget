import { Controller, Get, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('getCategoriesList')
  async getCategoriesList(): Promise<Category[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get('getCategoriesWithExpanses')
  async getCategoriesWithExpenses(@Req() request: Request) {
    const user = request['user'];
    const categoriesWithExpenses =
      await this.categoriesService.getCategoriesWithExpenses(user);

    return categoriesWithExpenses;
  }
}
