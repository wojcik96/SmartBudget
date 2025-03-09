import { Component, inject } from '@angular/core'

import { CategoryService } from './category.service'
import { CategoryItemComponent } from './category-item/category-item.component'
import { CategoriesRequestService } from '../../../shared/services/categories-request.service'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  imports: [CategoryItemComponent],
})
export class CategoryListComponent {
  private categoriesReqService = inject(CategoriesRequestService)

  protected categoriesWithExpenses = toSignal(
    this.categoriesReqService.getCategoriesWithExpenses()
  )
}
