import { Component, inject } from '@angular/core'
import { CategoryItemComponent } from './category-item/category-item.component'
import { AppDataService } from '../../../shared/services/app-data.service'

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  imports: [CategoryItemComponent],
})
export class CategoryListComponent {
  private appDataService = inject(AppDataService)

  protected categoriesWithExpenses = this.appDataService.categoriesSummaryList
}
