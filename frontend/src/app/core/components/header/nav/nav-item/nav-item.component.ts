import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: '[appNavItem]',
  standalone: true,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
})
export class NavItemComponent {
  routerLink = input.required<string>();
  label = input.required<string>();
}
