import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'

export interface User {
  username: string
  password: string
}

export interface JWTToken {
  access_token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router)

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public loggedInStatus$ = this.isAuthenticatedSubject.asObservable()

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject.next(this.isLoggedIn())
  }

  public login(data: User): Observable<JWTToken> {
    return this.http.post<JWTToken>('http://localhost:3000/auth/login', data)
  }

  private setLoggedIn(status: boolean): void {
    this.isAuthenticatedSubject.next(status)
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }

  public logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
    this.setLoggedIn(false)
  }

  public register(data: User): boolean {
    // TODO
    return true
  }
}
