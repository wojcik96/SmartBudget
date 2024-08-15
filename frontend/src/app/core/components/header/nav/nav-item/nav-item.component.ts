import { Component, Input } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: '[appNavItem]',
  standalone: true,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  imports: [RouterLink, RouterLinkActive],
})
export class NavItemComponent {
  @Input({ required: true }) routerLink!: string;
  @Input({ required: true }) label!: string;
}
