import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TransactionComponent } from './features/transaction/transaction.component';
import { AccountsComponent } from './features/accounts/accounts.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transaction', component: TransactionComponent},
  { path: 'accounts', component: AccountsComponent },
  { path: '**', component: PageNotFoundComponent }
];
