import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, throwError, timeout } from 'rxjs'
import { Transaction, TransactionFormDto } from '../../../shared/defs/transactions'

@Injectable({
  providedIn: 'root',
})
export class TransactionRequestService {
  private http = inject(HttpClient)

  public getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      'http://localhost:3000/transactions/getAllTransactions'
    )
  }

  public saveTransaction(data: TransactionFormDto): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(
      'http://localhost:3000/transactions/createTransaction',
      data,
    )
  }

  public removeTransaction(transactionId: string): Observable<Transaction[]> {
    return this.http.delete<Transaction[]>(
      `http://localhost:3000/transactions/remove/${transactionId}`
    )
  }
}
