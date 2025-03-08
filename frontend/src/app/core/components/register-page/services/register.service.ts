import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserRegisterDto } from '../../../../shared/defs/user'

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient)

  public addUser(data: UserRegisterDto): Observable<void> {
    return this.http.post<void>('http://localhost:3000/user', data)
  }
}
