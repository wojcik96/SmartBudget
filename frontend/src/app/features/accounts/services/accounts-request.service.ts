import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AccountDetails } from '../../../shared/defs/accounts'

@Injectable({
  providedIn: 'root',
})
export class AccountsRequestService {
  private http = inject(HttpClient)

  public getAll(): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>('http://localhost:3000/accounts/getAccountsList')
  }

  public create(data: AccountDetails): Observable<AccountDetails[]> {
    return this.http.post<AccountDetails[]>('http://localhost:3000/accounts/create', data)
  }

  public remove(accountId: string): Observable<AccountDetails[]> {
    return this.http.delete<AccountDetails[]>(
      `http://localhost:3000/accounts/remove/${accountId}`
    )
  }
}
