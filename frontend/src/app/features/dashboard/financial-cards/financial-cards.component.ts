import { Component } from '@angular/core'

import { FinancialCardComponent } from './financial-card/financial-card.component'
import { FinancialCard } from './financial-card.model'
import { AccountsService } from '../../accounts/accounts.service'
import { CategoryService } from '../../transaction/category-list/category.service'

@Component({
  selector: 'app-financial-cards',
  standalone: true,
  templateUrl: './financial-cards.component.html',
  styleUrl: './financial-cards.component.scss',
  imports: [FinancialCardComponent],
})
export class FinancialCardsComponent {
  constructor(private accountsService: AccountsService, private categoryService: CategoryService) {}

  financialCards: FinancialCard[] = [
    {
      icon: 'bi-wallet',
      title: 'Account and Wallet Balance',
      value: this.accountsService.getAllBalance(),
      currency: 'PLN',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Income',
      value: this.categoryService.getIncomeValue(),
      currency: 'PLN',
    },
    {
      icon: 'bi-graph-down-arrow',
      title: 'Expenses',
      value: this.categoryService.getAllExpenses(),
      currency: 'PLN',
    },
  ]
}
