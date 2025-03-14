import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, throwError, timeout } from 'rxjs'
import { CreateTransactionDto, Transaction, UpdateTransactionDto } from '../../../shared/defs/transactions'

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

  public createTransaction(data: CreateTransactionDto): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(
      'http://localhost:3000/transactions/create',
      data,
    )
  }

  public updateTransaction(data: UpdateTransactionDto): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(
      'http://localhost:3000/transactions/update',
      data,
    )
  }

  public removeTransaction(transactionId: string): Observable<Transaction[]> {
    return this.http.delete<Transaction[]>(
      `http://localhost:3000/transactions/remove/${transactionId}`
    )
  }
}
