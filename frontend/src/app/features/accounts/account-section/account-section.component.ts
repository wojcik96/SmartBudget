import { Component, Input } from '@angular/core';
import { TableConfig } from '../../../shared/model/table-config.model';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import {
  RowAction,
  RowActionType,
} from '../../../shared/model/row-action.model';
import { AccountsFormComponent } from '../accounts-form/accounts-form.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AccountType } from '../accounts.service';

@Component({
  selector: 'app-account-section',
  standalone: true,
  templateUrl: './account-section.component.html',
  styleUrl: './account-section.component.scss',
  imports: [DataTableComponent, AccountsFormComponent],
})
export class AccountSectionComponent {
  @Input({ required: true }) config!: TableConfig;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) modalText!: string;
  @Input({ required: true }) accountType!: AccountType;

  constructor(private modalService: ModalService) {}

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

  openModal() {
    this.modalService.open({
      title: this.modalText,
      formType: this.accountType,
      saveButtonLabel: 'Add',
      closeButtonLabel: 'Cancel',
    });

    // this.accountTableConfig.data.push({
    //   accountName: 'Account 1',
    //   importStatus: 'Activeeeee',
    //   lastImportDate: '08/02/2024',
    //   balance: '1,758.30 PLN',
    // });
  }
}
