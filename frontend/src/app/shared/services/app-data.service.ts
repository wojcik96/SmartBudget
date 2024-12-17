import { effect, inject, Injectable } from '@angular/core'
import { TransactionService } from '../../features/transaction/services/transaction.service'
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private transactionsService = inject(TransactionService)

  protected transaction = toSignal(this.transactionsService.transaction$)

  constructor() {
    effect(() => {
      console.log('this.transaction() was update', this.transaction())
    })

  }
    
}
