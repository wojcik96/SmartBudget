import { Component } from '@angular/core'
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component'
import { AccountSectionComponent } from './components/account-section/account-section.component'
import { WalletSectionComponent } from './components/wallet-section/wallet-section.component'

@Component({
  selector: 'app-accounts',
  standalone: true,
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  imports: [WrapperComponent, AccountSectionComponent, WalletSectionComponent],
})
export class AccountsComponent {}
