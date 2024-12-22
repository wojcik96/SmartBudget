import { Controller, Get } from '@nestjs/common';
import { Category } from './models/categories';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('getCategoriesList')
  getCategoriesList(): Category[] {
    return this.categoriesService.getAllCategories();
  }
}
