import { Component } from '@angular/core';

import { NavItemComponent } from "./nav-item/nav-item.component";
import { NavItem } from './nav-item.modle';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NavItemComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  navItems: NavItem[] = [
    { routerLink: '/dashboard', label: 'Dashboard' },
    { routerLink: '/transaction', label: 'Transaction' },
    { routerLink: '/accounts', label: 'Accounts and Wallets' },
    { routerLink: '/planner', label: 'Planner' },
    { routerLink: '/payments', label: 'Payments' }
  ];
}
