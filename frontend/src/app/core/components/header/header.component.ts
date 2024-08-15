import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { LogoComponent } from '../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterLink, NavComponent, LogoComponent],
})
export class HeaderComponent {}
