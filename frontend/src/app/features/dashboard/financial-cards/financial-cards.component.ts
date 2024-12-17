import { Component, inject } from '@angular/core'

import { FinancialCardComponent } from './financial-card/financial-card.component'
import { FinancialCard } from './financial-card.model'
import { AccountsService } from '../../accounts/services/accounts.service'
import { CategoryService } from '../../transaction/category-list/category.service'
import { TransactionService } from '../../transaction/services/transaction.service'

@Component({
  selector: 'app-financial-cards',
  standalone: true,
  templateUrl: './financial-cards.component.html',
  styleUrl: './financial-cards.component.scss',
  imports: [FinancialCardComponent],
})
export class FinancialCardsComponent {
  private accountsService = inject(AccountsService)
  private transactionService = inject(TransactionService)
  

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
      value: this.transactionService.incomeAmount(),
      currency: 'PLN',
    },
    {
      icon: 'bi-graph-down-arrow',
      title: 'Expenses',
      value: this.transactionService.expensesAmount(),
      currency: 'PLN',
    },
  ]
}
