import { Component } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';

@Component({
  selector: 'app-planner',
  standalone: true,
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss',
  imports: [WrapperComponent, BudgetsListComponent],
})
export class PlannerComponent {}
