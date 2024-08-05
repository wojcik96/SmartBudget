import { Component } from '@angular/core';

import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoryService } from './category.service';

import { CategorySummary } from './model/category-summary.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  imports: [CategoryItemComponent]
})
export class CategoryListComponent {
  categories!: CategorySummary[];

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getAllCategorySummaries();
  }
}
