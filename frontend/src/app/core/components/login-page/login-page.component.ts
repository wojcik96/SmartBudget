import { Component, inject } from '@angular/core'
import { AuthService } from '../../../shared/services/auth.service'
import { Router, RouterLink } from '@angular/router'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  protected loginForm: FormGroup

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  private submitForm(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (token) => {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('token', token.access_token)
        this.authService.isAuthenticatedSubject.next(true)
      },
      error: (err) => {
        console.error('Login failed', err)
      },
    })
  }

  public onSubmitBtnClick(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.submitForm()
  }
}
