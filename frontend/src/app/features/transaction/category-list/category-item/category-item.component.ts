import { Component, input } from '@angular/core';

import { CategoryItem } from '../category-item.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [CurrencyValueDirective],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent {
  categoryData = input<CategoryItem>();
}
