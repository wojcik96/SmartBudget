import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { ModalService } from './modal.service';
import { AccountType } from '../../../features/accounts/accounts.service';

export class ModalConfig {
  title?: string;
  description?: string;
  formType?: string;
  saveButtonLabel?: string;
  closeButtonLabel?: string;
  isSaveDisabled?: boolean = false;
  save?: Function = () => {};
  discard?: Function = () => {};


  constructor(
    title: string = '',
    description: string = '',
    save = null,
    discard = null,
    saveButtonLabel: string = 'Save changes',
    closeButtonLabel: string = 'Close',
  ) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (save) this.save = save;
    if (discard) this.discard = discard;
    if (saveButtonLabel) this.saveButtonLabel = saveButtonLabel;
    if (closeButtonLabel) this.closeButtonLabel = closeButtonLabel;
  }
}

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [],
})
export class ModalComponent {
  @ContentChild('formElement') formElement!: ElementRef<HTMLFormElement>;

  constructor(private modalService: ModalService) {}

  get open() {
    return this.modalService.isOpen;
  }

  get config() {
    return this.modalService.config;
  }

  discardWrapper(event: Event) {
    this.modalService.isOpen = false;
    if (this.config.discard) {
      this.config.discard(event);
    }
  }

  saveWrapper(event: Event) {
    if (this.formElement) {
      this.formElement.nativeElement.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );
      return;
    }

    this.modalService.isOpen = false;
    if (this.config.save) {
      this.config.save(event);
    }
  }
}
