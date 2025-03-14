import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Budget } from '../../../shared/defs/budgets'

@Injectable({
  providedIn: 'root',
})
export class BudgetRequestService {
  private http = inject(HttpClient)

  public getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>('http://localhost:3000/budgets/getAll')
  }

  public create(data: Budget): Observable<Budget[]> {
    return this.http.post<Budget[]>('http://localhost:3000/budgets/create', data)
  }

  public remove(id: string): Observable<Budget[]> {
    return this.http.delete<Budget[]>(`http://localhost:3000/budgets/remove/${id}`)
  }
}
