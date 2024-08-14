import { Component, input, output } from '@angular/core';

import { TableConfig } from '../../model/table-config.model';
import { RowAction, RowActionType } from '../../model/row-action.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  tableConfig = input.required<TableConfig>();
  selectedRow = output<RowAction>();
  rowActionType = RowActionType;

  onClick(rowId: string, type: RowActionType) {
    this.selectedRow.emit({
      rowId: rowId,
      type: type,
    });
  }
}
