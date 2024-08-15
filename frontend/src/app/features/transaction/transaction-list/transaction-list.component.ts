import { Component } from '@angular/core';

import { TransactionService } from '../transaction.service';
import { Transaction } from './model/transaction.model';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  imports: [TransactionItemComponent],
})
export class TransactionListComponent {
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {
    this.transactions = this.transactionService.getAllTransaction();
  }
}
