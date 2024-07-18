import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavComponent } from "./nav/nav.component";
import { LogoComponent } from "../../shared/components/logo/logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
