import { Component } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WrapperComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
