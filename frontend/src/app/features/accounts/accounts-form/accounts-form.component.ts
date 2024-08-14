import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-accounts-form',
  standalone: true,
  templateUrl: './accounts-form.component.html',
  styleUrl: './accounts-form.component.scss',
  imports: [
    ModalComponent, 
    ReactiveFormsModule
  ],
})
export class AccountsFormComponent {
  accountsForm!: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.accountsForm = this.formBuilder.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    if (this.accountsForm.valid) {
      const { name, amount, currency } = this.accountsForm.value;

      this.accountsService.addEntry(this.modalService.config.accountType!, {
        name,
        amount,
        currency,
      });
      this.modalService.config.isSaveDisabled = !this.accountsForm.valid;
      this.closeModal();
    } else {
      this.accountsForm.markAllAsTouched();
    }
  }

  private closeModal() {
    this.accountsForm.reset({
      currency: ''
    });
    this.modalService.isOpen = false;
  }
}
