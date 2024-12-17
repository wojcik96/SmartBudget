import { Component } from '@angular/core';

import { NavItemComponent } from './nav-item/nav-item.component';
import { NavItem } from './nav-item.modle';
import { UserMenuComponent } from "../../user-menu/user-menu.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  imports: [NavItemComponent, UserMenuComponent],
})
export class NavComponent {
  navItems: NavItem[] = [
    { routerLink: '/dashboard', label: 'Dashboard' },
    { routerLink: '/transaction', label: 'Transaction' },
    { routerLink: '/accounts', label: 'Accounts and Wallets' },
    { routerLink: '/planner', label: 'Planner' },
  ];
}
