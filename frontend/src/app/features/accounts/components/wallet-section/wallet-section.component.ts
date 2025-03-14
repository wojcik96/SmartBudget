import { Component, computed, inject } from '@angular/core'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import {
  AccountType,
  AccountDialogData,
} from '../../../../shared/defs/accounts'
import {
  RowAction,
  RowActionType,
} from '../../../../shared/model/row-action.model'
import { AppDataService } from '../../../../shared/services/app-data.service'
import { AccountsRequestService } from '../../services/accounts-request.service'
import { AccountsFormComponent } from '../accounts-form/accounts-form.component'
import { MatTableModule } from '@angular/material/table'
import { RowOptionsComponent } from '../../../../shared/components/row-options/row-options.component'
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component'
import { MatButtonModule } from '@angular/material/button'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-wallet-section',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    DatePipe,
    RowOptionsComponent,
    NoDataComponent,
  ],
  templateUrl: './wallet-section.component.html',
  styleUrl: './wallet-section.component.scss',
})
export class WalletSectionComponent {
  private dialog = inject(MatDialog)
  private appDataService = inject(AppDataService)
  private accountsReqService = inject(AccountsRequestService)

  protected walletList = computed(() =>
    this.appDataService
      .accountsList()
      .filter((account) => account.type === AccountType.Wallet)
  )
  protected displayedColumns = ['name', 'createdAt', 'balance', 'options']

  private removeAccount(id: string): void {
    this.accountsReqService.remove(id).subscribe((accountList) => {
      this.appDataService.accountsListUpdate(accountList)
    })
  }

  protected handleRowAction(event: RowAction) {
    switch (event.type) {
      case RowActionType.Edit:
        this.openAccountDialog(event.id)
        break
      case RowActionType.Delete:
        this.removeAccount(event.id)
        break
    }
  }

  public openAccountDialog(id?: string) {
    const action = id ? 'Edit' : 'Add'
    const title = `${action} Wallet`

    this.dialog.open<AccountsFormComponent, AccountDialogData>(
      AccountsFormComponent,
      {
        data: {
          id,
          title,
          type: AccountType.Wallet,
        },
      }
    )
  }
}
