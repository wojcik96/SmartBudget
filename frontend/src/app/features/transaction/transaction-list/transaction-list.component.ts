import { Component } from '@angular/core';

import { TransactionService } from '../transaction.service';
import { Transaction } from './model/transaction.model';
import { DataTableComponent } from "../../../shared/components/data-table/data-table.component";
import { ColumnType, TableConfig } from '../../../shared/model/table-config.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  imports: [DataTableComponent],
})
export class TransactionListComponent {
  private transactions: Transaction[] = [];
  private transactionTableColumns = [
    { label: 'Date', key: 'date', cssClass: 'col-2' },
    { label: 'Title', key: 'title', cssClass: 'col', type: ColumnType.NAME },
    { label: 'Category', key: 'categoryName', cssClass: 'col-3' },
    { label: 'Amount', key: 'amount', cssClass: 'col-2', type: ColumnType.CURRENCY },
  ];
  tableConfig!: TableConfig;
  
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactions = this.transactionService.getAllTransaction();
    this.tableConfig = {
      columns: this.transactionTableColumns,
      data: this.transactions,
      showDropdownMenu: true
    }
  }
}
