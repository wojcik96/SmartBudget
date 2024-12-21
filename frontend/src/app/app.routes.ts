import { Routes } from '@angular/router'

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component'
import { DashboardComponent } from './features/dashboard/dashboard.component'
import { TransactionComponent } from './features/transaction/transaction.component'
import { AccountsComponent } from './features/accounts/accounts.component'
import { PlannerComponent } from './features/planner/planner.component'
import { LoginPageComponent } from './core/components/login-page/login-page.component'
import { AuthGuard } from './shared/guards/auth-guard.service'
import { RegisterPageComponent } from './core/components/register-page/register-page.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, data: { onlyContent: true } },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'planner', component: PlannerComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
]
