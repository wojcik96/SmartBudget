import { inject, Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackbar = inject(MatSnackBar)

  public openSuccessToast(
    message: string,
    type: ToastType,
    config?: MatSnackBarConfig
  ): void {
    let cssClass = '';
    
    switch (type) {
      case 'success':
        cssClass = 'success-snackbar';
        break;
      case 'error':
        cssClass = 'error-snackbar';
        break;
      case 'warning':
        cssClass = 'warning-snackbar';
        break;
      case 'info':
        cssClass = 'info-snackbar';
        break;
    }

    this.snackbar.open(message, 'Close', {
      horizontalPosition: 'right',
      duration: 3000,
      panelClass: cssClass,
      ...config,
    })
  }

  constructor() {}
}
