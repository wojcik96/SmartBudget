import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  routerLink = input.required<string>();
  label = input.required<string>();
}
