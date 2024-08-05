import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

export class ModalConfig {
  title?: string = '';
  description?: string = '';
  save?: Function = () => {};
  discard?: Function = () => {};

  constructor(
    title: string = '',
    description: string = '',
    save = null,
    discard = null
  ) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (save) this.save = save;
    if (discard) this.discard = discard;
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
    this.modalService.isOpen = false;
    if (this.config.save) {
      this.config.save(event);
    }
  }
}
