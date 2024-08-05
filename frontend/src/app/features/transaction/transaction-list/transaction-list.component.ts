import { Component } from '@angular/core';

import { Transaction } from './model/transaction.model'
import { TransactionItemComponent } from "./transaction-item/transaction-item.component";
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: Transaction[];
  
  constructor(private transactionService: TransactionService) {
    this.transactions = this.transactionService.getAllTransaction();
  }
}
