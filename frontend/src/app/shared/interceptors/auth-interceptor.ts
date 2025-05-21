import { inject } from '@angular/core'
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { catchError, EMPTY, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { ToastService } from '../services/toast.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService   = inject(AuthService);
  const toastService  = inject(ToastService);
  const router        = inject(Router);

  const url = req.url;

  // 1. Pomiń interceptor dla logowania/rejestracji itp.
  const isAuthEndpoint =
    url.endsWith('/login') ||
    url.endsWith('/register') ||
    url.endsWith('/refresh-token');

  // 2. Jeśli mamy token i to nie jest endpoint auth, dołącz nagłówek
  const token = authService.getToken();
  const reqToHandle = token && !isAuthEndpoint
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // 3. Obsłuż odpowiedź — łapemy 401 tylko gdy nie jest to endpoint auth
  return next(reqToHandle).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!isAuthEndpoint && err.status === 401) {
        authService.setToken(null);
        router.navigateByUrl('/login');
        toastService.openSuccessToast(
          'Your session lost! Log-in again!',
          'info'
        );
        return EMPTY;
      }
      return throwError(() => err);
    })
  );

}

const catchLostSessionError = (
  err: HttpErrorResponse,
  authService: AuthService,
  router: Router,
  toastService: ToastService
) => {
  if (err instanceof HttpErrorResponse && err.status === 401) {
    authService.setToken(null)
    router.navigateByUrl('/login')
    openSessionLostToast(toastService)
    return EMPTY
  }

  return throwError(() => err)
}

const openSessionLostToast = (toastService: ToastService) => {
  toastService.openSuccessToast('Your session lost! Log-in again!', 'info')
}
