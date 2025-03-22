import { Component, EventEmitter, inject, Output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { AppDataService } from '../../../shared/services/app-data.service'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-transaction-filters',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './transaction-filters.component.html',
  styleUrl: './transaction-filters.component.scss',
})
export class TransactionFiltersComponent {
  private appDataService = inject(AppDataService)

  protected accountsList = this.appDataService.accountsList
  protected categoriesList = this.appDataService.categoriesList

  @Output() filterChanged = new EventEmitter<{
    accountId: string
    categoryId: string
  }>()

  selectedAccount: string = ''
  selectedCategory: string = ''

  applyFilter() {
    this.filterChanged.emit({
      accountId: this.selectedAccount,
      categoryId: this.selectedCategory,
    })
  }
}
