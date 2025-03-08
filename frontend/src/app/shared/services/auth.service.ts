import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { jwtDecode } from 'jwt-decode'
import { UserLoginDto } from '../defs/user'

export interface JWTToken {
  access_token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login'
  private router = inject(Router)
  private http = inject(HttpClient)
  private cookieService = inject(CookieService)

  public tokenChanged = new BehaviorSubject<void>(undefined)

  // TODO: do przerobienia aby uzyskać wylogowywanie z apki. Aktualnie nie wylogowywuje się.
  public setToken(token: string | null): void {
    if (token) {
      const user = jwtDecode<any>(token)

      this.cookieService.set('jwt', token, {
        expires: new Date(Date.now() + user.exp),
      })
    } else {
      this.cookieService.delete('jwt')
    }
    this.tokenChanged.next()
  }

  public login(credentials: UserLoginDto): Observable<any> {
    return this.http.post<JWTToken>(this.apiUrl, credentials).pipe(
      tap((response) => {
        this.setToken(response.access_token)
      })
    )
  }

  public logout(): void {
    this.cookieService.delete('jwt')
    this.tokenChanged.next()
    this.router.navigate(['/login'])
  }

  public isAuthenticated(): boolean {
    return !!this.getToken()
  }

  public getToken(): string | null {
    return this.cookieService.get('jwt') || null
  }
}
