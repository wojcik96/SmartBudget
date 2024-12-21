import { Component, inject } from '@angular/core'

import { NavComponent } from './nav/nav.component'
import { LogoComponent } from '../../../shared/components/logo/logo.component'
import { AuthService } from '../../../shared/services/auth.service'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [NavComponent, LogoComponent],
})
export class HeaderComponent {
  private authService = inject(AuthService)

  protected isLogIn = toSignal(this.authService.loggedInStatus$)
}
