import { Component } from '@angular/core';

import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { FinancialCardComponent } from "./financial-card/financial-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WrapperComponent, FinancialCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
