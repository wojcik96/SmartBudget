import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-financial-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './financial-card.component.html',
  styleUrl: './financial-card.component.scss'
})
export class FinancialCardComponent {
  @Input() icon: string = 'bi-wallet';
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() currencyCode: string = 'PLN';
}
