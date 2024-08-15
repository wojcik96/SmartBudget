import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ModalService } from '../../../shared/components/modal/modal.service';
import { CategoryService } from '../category-list/category.service';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-list/model/transaction-type.enum';
import { Category } from '../category-list/model/category.model';
import { WrapperComponent } from '../../../shared/components/wrapper/wrapper.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { generateId } from '../../../shared/utils/id-generator';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  imports: [ReactiveFormsModule, WrapperComponent, ModalComponent],
})
export class TransactionFormComponent {
  categories!: Category[];
  transactionForm!: FormGroup;
  transactionType = TransactionType;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllCategories();
  }

  initForm() {
    this.transactionForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      categoryId: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = this.extractTransactionData();
      const transaction = this.createTransaction(transactionData);
      this.transactionService.addTransaction(transaction);
      this.closeModal();
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  private extractTransactionData() {
    const { title, date, type, categoryId, amount } = this.transactionForm.value;
    const categoryLabel = this.categoryService.getCategoryLabelById(categoryId);

    return { title, date, type, categoryId, categoryLabel, amount };
  }

  private createTransaction(data: {
    title: string;
    date: string;
    type: TransactionType;
    categoryId: string;
    categoryLabel: string;
    amount: number;
  }) {
    return {
      id: generateId('tra'),
      createdDate: '',
      date: data.date,
      title: data.title,
      type: data.type,
      categoryName: data.categoryLabel,
      categoryId: data.categoryId,
      amount: data.amount,
    };
  }

  private getAllCategories() {
    this.categories = this.categoryService.getAvailableCategories();
  }

  private closeModal() {
    this.transactionForm.reset();
    this.modalService.isOpen = false;
  }
}
