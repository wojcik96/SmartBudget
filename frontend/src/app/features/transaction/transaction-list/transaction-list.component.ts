import { Component } from '@angular/core';

import { Transaction } from './transaction.model'
import { TransactionItemComponent } from "./transaction-item/transaction-item.component";

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TransactionItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: Transaction[] = [
    { date: '2024-08-01', title: 'Wynagrodzenie', category: 'Przychody', amount: 3000 },
    { date: '2024-08-02', title: 'Zakupy spożywcze', category: 'Zakupy', amount: -200 },
    { date: '2024-08-03', title: 'Czynsz za mieszkanie', category: 'Mieszkanie', amount: -1200 },
    { date: '2024-08-04', title: 'Ubezpieczenie zdrowotne', category: 'Ubezpieczenia', amount: -300 },
    { date: '2024-08-05', title: 'Wydatki na paliwo', category: 'Transport', amount: 0 },
    { date: '2024-08-06', title: 'Zakupy biurowe', category: 'Praca', amount: 0 },
    { date: '2024-08-07', title: 'Wizyty lekarskie', category: 'Zdrowie', amount: -250 },
    { date: '2024-08-08', title: 'Prezent urodzinowy', category: 'Rodzina', amount: -500 },
    { date: '2024-08-09', title: 'Kino', category: 'Rozrywka', amount: -80 },
    { date: '2024-08-10', title: 'Oszczędności miesięczne', category: 'Oszczędności', amount: 400 },
  ];
  
}
