import { Component, input } from '@angular/core';

@Component({
  selector: 'app-account-list-header',
  standalone: true,
  templateUrl: './account-list-header.component.html',
  styleUrl: './account-list-header.component.scss'
})
export class AccountListHeaderComponent {
  nameLabel = input.required<string>();
  balanceLabel = input.required<string>();
}
