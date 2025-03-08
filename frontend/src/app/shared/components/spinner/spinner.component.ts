import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() isFullscreen = false;

  @HostBinding('class.fullscreen') get fullscreen() {
    return this.isFullscreen;
  }
}
