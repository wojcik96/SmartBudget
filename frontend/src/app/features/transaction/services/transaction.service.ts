import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Transaction, TransactionFormData } from "../../../shared/defs/transactions";
import { generateId } from "../../../shared/utils/id-generator";
import { loadDataFromLS, saveDataToLS } from "../../../shared/utils/localStorage";
import { CategoryService } from "../category-list/category.service";


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private categoryService = inject(CategoryService);
  private TRANSACTION_LIST_KEY = 'SmBu-TraLis'
  private transactionSummaryList =
    loadDataFromLS(this.TRANSACTION_LIST_KEY) || []
  private transactionSubject = new BehaviorSubject<Transaction[]>(
    this.transactionSummaryList
  )
  public transaction$ = this.transactionSubject.asObservable()

  private addTransaction(data: TransactionFormData): void {
    const newEntry: Transaction = {
      id: generateId(),
      createdDate: new Date().toLocaleDateString(),
      date: data.date,
      title: data.title,
      amount: data.amount,
      categoryId: data.categoryId,
      categoryName: this.categoryService.getCategoryLabelById(data.categoryId),
      type: data.type,
    }

    this.transactionSubject.next([...this.transactionSubject.getValue(), newEntry])
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }

  private updateTransaction(data: TransactionFormData): void { 
    const updatedTransaction = this.transactionSubject.getValue().map((transaction) => {
      if (transaction.id === data.id) {
        return {
          ...transaction,
          date: data.date,
          title: data.title,
          amount: data.amount,
          categoryId: data.categoryId,
          categoryName: this.categoryService.getCategoryLabelById(data.categoryId),
          type: data.type,
        }
      }
      return transaction
    })

    this.transactionSubject.next(updatedTransaction)
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }

  
  public getAllTransaction(): Transaction[] {
    return this.transactionSummaryList
  }

  public saveDetails(data: Transaction): void {
    if (data.id) {
      this.updateTransaction(data)
    } else {
      this.addTransaction(data)
    }
  }

  public removeTransaction(transactionId: string): void {
    const updatedAccounts = this.transactionSubject
      .getValue()
      .filter((transaction) => transaction.id !== transactionId)

    this.transactionSubject.next(updatedAccounts)
    saveDataToLS(this.TRANSACTION_LIST_KEY, this.transactionSubject.value)
  }
}
