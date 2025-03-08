import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {
  message = input('Ups! Nic tu nie ma...');

}
