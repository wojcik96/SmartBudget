import { Component } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { TableConfig } from '../../shared/model/table-config.model';
import { RowAction, RowActionType } from '../../shared/model/row-action.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  imports: [WrapperComponent, DataTableComponent],
})
export class AccountsComponent {
  accountTableConfig: TableConfig = {
    columns: [
      { label: 'Account Name', key: 'accountName', width: 'col-2' },
      { label: 'Import Status', key: 'importStatus', width: 'col' },
      { label: 'Last Import Date', key: 'lastImportDate', width: 'col-3' },
      { label: 'Balance', key: 'balance', width: 'col-2 text-end' },
    ],
    data: [
      {
        accountName: 'Account 0',
        importStatus: 'Active',
        lastImportDate: '08/02/2024',
        balance: '145,758.30 PLN',
      },
    ],
  };

  walletsTableConfig: TableConfig = {
    columns: [
      { label: 'Date Added', key: 'dateAdded', width: 'col-2' },
      { label: 'Name', key: 'name', width: 'col' },
      { label: 'Balance', key: 'balance', width: 'col-3' },
      { label: '', key: 'empty', width: 'col-2 text-end' },
    ],
    data: [
      {
        dateAdded: '08.02.2024',
        name: 'Wallet PL',
        balance: '145,758.30 PLN',
        empty: '',
      },
      {
        dateAdded: '10.02.2024',
        name: 'EUR',
        balance: '5,765.40 EUR',
        empty: '',
      },
    ],
  };

  addRow() {
    this.accountTableConfig.data.push({
      accountName: 'Account 1',
      importStatus: 'Activeeeee',
      lastImportDate: '08/02/2024',
      balance: '1,758.30 PLN',
    });
  }

  // removeRow() {
  //   this.accountTableConfig.data.find();
  // }

  handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        console.log(RowActionType.Edit, event.rowId);
        
        break;
      case RowActionType.Delete:
        console.log(RowActionType.Delete, event.rowId);

        break;
    }
  }
}
