import { Component, input } from '@angular/core';

import { CategorySummary } from '../model/category-summary.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: 'app-category-item',
  standalone: true,
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
  imports: [CurrencyValueDirective]
})
export class CategoryItemComponent {
  categoryData = input.required<CategorySummary>();
}
