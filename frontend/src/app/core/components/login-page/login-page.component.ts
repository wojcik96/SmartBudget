import { Component, inject } from '@angular/core'
import { AuthService } from '../../../shared/services/auth.service'
import { Router, RouterLink } from '@angular/router'
import {
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from '@angular/forms'
import { AppDataService } from '../../../shared/services/app-data.service'
import { ToastService } from '../../../shared/services/toast.service'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { catchError, EMPTY, tap } from 'rxjs'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private formBuilder = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private authService = inject(AuthService)
  private appDataService = inject(AppDataService)
  private toastService = inject(ToastService)

  protected form = this.formBuilder.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
  })

  private saveForm(): void {
    this.authService
      .login(this.form.getRawValue())
      .pipe(
        catchError(() => {
          this.openErrorToast()
          return EMPTY
        }),
        tap(() => {
          this.router.navigate(['/dashboard'])
        })
      )
      .subscribe((token) => {
        this.authService.setToken(token.access_token)
        this.appDataService.getGlobalData()
        this.openSuccessToast()
      })
  }

  private openSuccessToast(): void {
    this.toastService.openSuccessToast('Login successful!', 'success', {
      horizontalPosition: 'right',
      duration: 3000,
    })
  }

  private openErrorToast(): void {
    this.toastService.openSuccessToast(
      'Invalid login credentials, please try again!',
      'error',
      {
        horizontalPosition: 'right',
        duration: 3000,
      }
    )
  }

  public onSubmitBtnClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.saveForm()
  }
}
