import { Component } from '@angular/core';

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { FinancialCardComponent } from "./financial-card/financial-card.component";
import { BudgetsComponent } from "./budgets/budgets.component";
import { AccountsListComponent } from "./accounts-list/accounts-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WrapperComponent, FinancialCardComponent, BudgetsComponent, AccountsListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  financialCards = [
    { icon: 'bi-wallet', title: 'Account and Wallet Balance', value: 144411.19 },
    { icon: 'bi-graph-up-arrow', title: 'Income', value: 14411.19 },
    { icon: 'bi-graph-down-arrow', title: 'Expenses', value: 4411.19 }
  ];
}
