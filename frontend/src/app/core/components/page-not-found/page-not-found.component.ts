import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  imports: [RouterLink],
})
export class PageNotFoundComponent {}
