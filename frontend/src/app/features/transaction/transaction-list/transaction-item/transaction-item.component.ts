import { Component, input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { CurrencyValueDirective } from '../../../../shared/directives/currency-value.directive';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
  imports: [CurrencyValueDirective],
})
export class TransactionItemComponent {
  data = input<Transaction>();
  amountClass: string = 'text-muted';

  ngOnInit() {
    this.getAmountClass();
  }

  getAmountClass() {
    const amount = this.data()!.amount;

    if (amount > 0) {
      this.amountClass = 'text-success';
    } else if (amount < 0) {
      this.amountClass = 'text-danger';
    }
  }
}
