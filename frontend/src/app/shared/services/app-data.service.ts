import { inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { BehaviorSubject, filter, map, shareReplay, switchMap, tap } from 'rxjs'
import { TransactionRequestService } from '../../features/transaction/services/transaction-request.service'
import { Transaction } from '../defs/transactions'
import { CategoriesRequestService } from './categories-request.service'
import { AccountsRequestService } from '../../features/accounts/services/accounts-request.service'
import { AccountDetails } from '../defs/accounts'
import { BudgetRequestService } from '../../features/planner/services/budget-request.service'
import { Budget } from '../defs/budgets'
import { AuthService } from './auth.service'
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private authService = inject(AuthService)
  private transactionReqService = inject(TransactionRequestService)
  private accountsReqService = inject(AccountsRequestService)
  private budgetReqService = inject(BudgetRequestService)
  private categoriesReqService = inject(CategoriesRequestService)

  public user = toSignal(
    this.authService.tokenChanged.pipe(
      map(() => {
        const token = this.authService.getToken()
        return token ? jwtDecode(token) : null
      })
    )
  )

  // Translations Logic
  private transactionsUpdate = new BehaviorSubject<Transaction[]>([])

  public transactionsList = toSignal(this.transactionsUpdate.asObservable(), {
    initialValue: [],
  })

  public transactionsListUpdate(transactions: Transaction[]): void {
    this.transactionsUpdate.next(transactions)
  }

  private transactionsRequestUpdate = new BehaviorSubject<void>(undefined)

  private transactionsList$ = this.transactionsRequestUpdate
    .pipe(
      filter(() => !!this.user()),
      switchMap(() => this.transactionReqService.getAllTransactions()),
      tap((transactions) => {
        this.transactionsUpdate.next(transactions)
      }),
      shareReplay(1)
    )
    .subscribe()

  public updateTransactionsListRequest(): void {
    this.transactionsRequestUpdate.next()
  }

  // Accounts Logic
  private accountsUpdate = new BehaviorSubject<AccountDetails[]>([])

  public accountsList = toSignal(this.accountsUpdate.asObservable(), {
    initialValue: [],
  })

  public accountsListUpdate(accounts: AccountDetails[]): void {
    this.accountsUpdate.next(accounts)
  }

  private accountsRequestUpdate = new BehaviorSubject<void>(undefined)

  private accountsList$ = this.accountsRequestUpdate
    .pipe(
      filter(() => !!this.user()),
      switchMap(() => this.accountsReqService.getAll()),
      tap((accounts) => {
        this.accountsUpdate.next(accounts)
      }),
      shareReplay(1)
    )
    .subscribe()

  public updateAccountsListRequest(): void {
    this.accountsRequestUpdate.next()
  }

  // Budget Logic
  private budgetUpdate = new BehaviorSubject<Budget[]>([])

  public budgetList = toSignal(this.budgetUpdate.asObservable(), {
    initialValue: [],
  })

  public budgetListUpdate(budget: Budget[]): void {
    this.budgetUpdate.next(budget)
  }

  private budgetRequestUpdate = new BehaviorSubject<void>(undefined)

  private budgetList$ = this.budgetRequestUpdate
    .pipe(
      filter(() => !!this.user()),
      switchMap(() => this.budgetReqService.getAll()),
      tap((budget) => {
        this.budgetUpdate.next(budget)
      }),
      shareReplay(1)
    )
    .subscribe()

  public updateBudgetListRequest(): void {
    this.budgetRequestUpdate.next()
  }

  // Categories Logic
  private categoriesRequestUpdate = new BehaviorSubject<void>(undefined)

  private categoriesList$ = this.categoriesRequestUpdate.pipe(
    filter(() => !!this.user()),
    switchMap(() => this.categoriesReqService.getCategoriesList()),
    shareReplay(1)
  )

  public categoriesList = toSignal(this.categoriesList$)

  private categoriesSummaryRequestUpdate = new BehaviorSubject<void>(undefined)

  private categoriesSummaryList$ = this.categoriesSummaryRequestUpdate
    .pipe(
      filter(() => !!this.user()),
      switchMap(() => this.categoriesReqService.getCategoriesWithExpenses()),
      tap((budget) => {
        this.budgetUpdate.next(budget)
      }),
      shareReplay(1)
    )

  public categoriesSummaryList = toSignal(this.categoriesSummaryList$)

  public updateCategoriesSummaryListRequest(): void {
    this.categoriesSummaryRequestUpdate.next()
  }

  // Global Data Logic
  public getGlobalData(): void {
    this.updateTransactionsListRequest()
    this.updateAccountsListRequest()
    this.updateBudgetListRequest()
    this.categoriesRequestUpdate.next()
  }
}
