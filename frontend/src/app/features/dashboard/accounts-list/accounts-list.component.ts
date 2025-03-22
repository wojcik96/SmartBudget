import { Component, computed, inject } from '@angular/core'

import { TableConfig } from '../../../shared/model/table-config.model'
import { AccountType } from '../../../shared/defs/accounts'
import { AppDataService } from '../../../shared/services/app-data.service'
import { MatTableModule } from '@angular/material/table'
import { NoDataComponent } from '../../../shared/components/no-data/no-data.component'

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [MatTableModule, NoDataComponent],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.scss',
})
export class AccountsListComponent {
  private appDataService = inject(AppDataService)

  protected displayedColumns = ['name', 'balance']
  protected accountList = computed(() =>
    this.appDataService
      .accountsList()
      ?.filter((account) => account.type === AccountType.Bank)
  )

  protected walletList = computed(() =>
    this.appDataService
      .accountsList()
      ?.filter((account) => account.type === AccountType.Wallet)
  )
}
