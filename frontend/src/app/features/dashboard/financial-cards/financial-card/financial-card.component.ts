import { Component, input } from '@angular/core';

import { FinancialCard } from '../financial-card.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: '[appFinancialCard]',
  standalone: true,
  templateUrl: './financial-card.component.html',
  styleUrl: './financial-card.component.scss',
  imports: [CurrencyValueDirective]
})
export class FinancialCardComponent {
  cardData = input<FinancialCard>();
}
