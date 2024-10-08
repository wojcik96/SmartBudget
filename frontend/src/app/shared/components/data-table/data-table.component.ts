import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TableConfig } from '../../model/table-config.model';
import { RowAction, RowActionType } from '../../model/row-action.model';
import { CurrencyValueDirective } from '../../directives/currency-value.directive';
import { ColumnType } from '../../model/table-config.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [CurrencyValueDirective]
})
export class DataTableComponent {
  @Input({ required: true }) tableConfig!: TableConfig;
  @Output() selectedRow = new EventEmitter<RowAction>();

  columnType = ColumnType;
  rowActionType = RowActionType;

  onClick(rowId: string, type: RowActionType) {
    this.selectedRow.emit({
      rowId: rowId,
      type: type,
    });
  }
  
}
