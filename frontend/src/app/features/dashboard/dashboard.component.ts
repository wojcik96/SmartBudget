import { Component } from '@angular/core';

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { BudgetsComponent } from "./budgets/budgets.component";
import { AccountsListComponent } from "./accounts-list/accounts-list.component";
import { FinancialCardsComponent } from "./financial-cards/financial-cards.component";
import { ChartComponent } from "./chart/chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    WrapperComponent,
    FinancialCardsComponent,
    BudgetsComponent,
    AccountsListComponent,
    ChartComponent
  ],
})
export class DashboardComponent { }
