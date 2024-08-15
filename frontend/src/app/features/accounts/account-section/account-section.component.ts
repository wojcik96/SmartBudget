import { Component, Input } from '@angular/core';

import { AccountsService } from '../accounts.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { TableConfig } from '../../../shared/model/table-config.model';
import { RowAction, RowActionType } from '../../../shared/model/row-action.model';
import { AccountType } from '../account.model';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { AccountsFormComponent } from '../accounts-form/accounts-form.component';

@Component({
  selector: 'app-account-section',
  standalone: true,
  templateUrl: './account-section.component.html',
  styleUrl: './account-section.component.scss',
  imports: [DataTableComponent, AccountsFormComponent],
})
export class AccountSectionComponent {
  @Input({ required: true }) config!: TableConfig;
  @Input({ required: true }) accountType!: AccountType;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) modalText!: string;

  constructor(
    private modalService: ModalService,
    private accountsService: AccountsService
  ) {}

  handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        console.log(RowActionType.Edit, event.rowId);
        break;
      case RowActionType.Delete:
        this.accountsService.removeEntry(event.rowId);
        break;
    }
  }

  openModal() {
    this.modalService.open({
      title: this.modalText,
      accountType: this.accountType,
      saveButtonLabel: 'Add',
      closeButtonLabel: 'Cancel',
    });
  }
}
