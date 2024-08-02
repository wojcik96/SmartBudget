import { Component } from '@angular/core';
import { WrapperComponent } from "../../shared/components/wrapper/wrapper.component";
import { NgFor, NgIf } from '@angular/common';
import { CategoryListComponent } from "./category-list/category-list.component";
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  imports: [
    WrapperComponent, 
    CategoryListComponent,
    TransactionListComponent
  ],
})
export class TransactionComponent {

}
