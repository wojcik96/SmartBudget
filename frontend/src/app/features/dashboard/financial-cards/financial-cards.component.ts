import { Component } from '@angular/core';

import { FinancialCardComponent } from "./financial-card/financial-card.component";
import { FinancialCard } from './financial-card.model';

@Component({
  selector: 'app-financial-cards',
  standalone: true,
  imports: [FinancialCardComponent],
  templateUrl: './financial-cards.component.html',
  styleUrl: './financial-cards.component.scss'
})
export class FinancialCardsComponent {
  financialCards: FinancialCard[] = [
    { icon: 'bi-wallet', title: 'Account and Wallet Balance', value: 144411.19, currency: 'PLN' },
    { icon: 'bi-graph-up-arrow', title: 'Income', value: 14411.19, currency: 'PLN' },
    { icon: 'bi-graph-down-arrow', title: 'Expenses', value: 4411.19, currency: 'PLN' }
  ];
}
