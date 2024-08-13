import { Component, Output } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionService } from './transaction.service';
import { ModalService } from '../../shared/components/modal/modal.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  imports: [
    WrapperComponent,
    CategoryListComponent,
    TransactionListComponent,
    TransactionFormComponent,
  ],
})
export class TransactionComponent {
  constructor(private modalService: ModalService) {}

  addTransaction() {
    this.modalService.open({
      title: 'Add transaction',
      saveButtonLabel: 'Add',
      closeButtonLabel: 'Cancel',
    });
  }
}
