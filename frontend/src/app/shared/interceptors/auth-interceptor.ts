import { inject } from '@angular/core'
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { catchError, EMPTY, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { ToastService } from '../services/toast.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const toastService = inject(ToastService)
  const router = inject(Router)

  const token = authService.getToken()
  if (!token) {
    return next(req).pipe(
      catchError((err) =>
        catchLostSessionError(err, authService, router, toastService)
      )
    )
  }

  const reqWithToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  return next(reqWithToken).pipe(
    catchError((err) =>
      catchLostSessionError(err, authService, router, toastService)
    )
  )
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
