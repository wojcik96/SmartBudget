import { Component, inject, signal } from '@angular/core'
import {
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { RegisterService } from './services/register.service'
import { catchError, EMPTY, finalize, tap } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ToastService } from '../../../shared/services/toast.service'
import { HttpErrorResponse } from '@angular/common/http'
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  private formBuilder = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private registerService = inject(RegisterService)
  private toastService = inject(ToastService)

  protected showSpinner = signal(false)
  protected form = this.formBuilder.group({
    login: ['', Validators.required],
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
        ),
      ],
    ],
    confirmPassword: ['', [Validators.required, this.validateSamePassword]],
  })

  private validateSamePassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.parent?.get('password')
    const confirmPassword = control.parent?.get('confirmPassword')
    return password?.value == confirmPassword?.value ? null : { passwordMismatch: true }
  }

  private saveForm() {
    this.showSpinner.set(true)

    this.registerService
      .addUser(this.form.getRawValue())
      .pipe(
        catchError((err) => {
          this.openErrorToast(err)
          return EMPTY
        }),
        tap(() => {
          this.openSuccessToast()
        }),
        finalize(() => {
          this.showSpinner.set(false)
        })
      )
      .subscribe(() => {
        this.router.navigate(['/login'])
      })
  }


  private openSuccessToast(): void {
    this.toastService.openSuccessToast('Register successful!', 'success', {
      horizontalPosition: 'right',
      duration: 3000,
    })
  }

  private openErrorToast(err: HttpErrorResponse): void {
    this.toastService.openSuccessToast(
      `${err.error.message}, please try again!`,
      'error',
      {
        horizontalPosition: 'right',
        duration: 5000,
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
