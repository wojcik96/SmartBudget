import { Component, Input } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

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
