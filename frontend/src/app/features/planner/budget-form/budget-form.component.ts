import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CategoryService } from '../../transaction/category-list/category.service';
import { PlannerService } from '../planner.service';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss',
})
export class BudgetFormComponent {
  budgetForm!: FormGroup;
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private plannerService: PlannerService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.categories = this.categoryService.getAvailableCategories();
    this.initForm();
  }

  initForm() {
    this.budgetForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      currency: ['', Validators.required],
      plannedAmount: [
        '',
        [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const { categoryId, currency, plannedAmount } = this.budgetForm.value;
      this.plannerService.addBudget({
        categoryId,
        currency,
        plannedAmount
      });
      this.closeModal();
    } else {
      this.budgetForm.markAllAsTouched();
    }
  }

  private closeModal() {
    this.budgetForm.reset({
      currency: '',
    });
    this.modalService.isOpen = false;
  }
}
