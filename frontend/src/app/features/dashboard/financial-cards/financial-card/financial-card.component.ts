import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FinancialCard } from '../financial-card.model';

@Component({
  selector: 'app-financial-card',
  standalone: true,
  templateUrl: './financial-card.component.html',
  styleUrl: './financial-card.component.scss',
  imports: [CurrencyPipe]
})
export class FinancialCardComponent {
  cardData = input<FinancialCard>();
}
