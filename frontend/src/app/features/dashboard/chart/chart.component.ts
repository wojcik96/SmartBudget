import { Component, effect, inject, signal } from '@angular/core'
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration } from 'chart.js/auto'
import { AppDataService } from '../../../shared/services/app-data.service'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import * as _moment from 'moment'
import { default as _rollupMoment, Moment } from 'moment'

const moment = _rollupMoment || _moment

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  private appDataService = inject(AppDataService)
  private chartsBackgrounds = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF5733',
    '#FFC300',
    '#4CAF50',
    '#FF1493',
    '#00FF00',
    '#800080',
    '#FFFF00',
    '#00FFFF',
    '#FF0000',
  ]

  protected date = new FormControl(moment())
  protected barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  }
  protected pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  }
  protected lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Amount' } },
    },
  }

  protected barChartData = signal<ChartConfiguration<'bar'>['data']>({
    labels: [],
    datasets: [
      { data: [], label: 'Expenses', backgroundColor: 'red' },
      { data: [], label: 'Income', backgroundColor: 'green' },
    ],
  })
  protected pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: [],
    datasets: [{ data: [], backgroundColor: this.chartsBackgrounds }],
  })
  protected lineChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Expenses',
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  })

  constructor() {
    effect(
      () => {
        const transactions = this.appDataService.transactionsList().reverse()

        if (transactions.length > 0) {
          this.updateCharts(transactions)
        }
      },
      { allowSignalWrites: true }
    )
  }

  private updateCharts(transactions: any[]): void {
    const { monthMap, dailyExpensesMap, categoryMap } =
      this.processTransactions(transactions)

    this.updateBarChartData(monthMap)
    this.updatePieChartData(categoryMap)
    this.updateLineChartData(dailyExpensesMap)
  }

  private processTransactions(transactions: any[]): {
    monthMap: Map<string, { expenses: number; income: number }>
    dailyExpensesMap: Map<number, number>
    categoryMap: Map<string, number>
  } {
    const monthMap = new Map<string, { expenses: number; income: number }>()
    const dailyExpensesMap = new Map<number, number>()
    const categoryMap = new Map<string, number>()

    const selectedMonth = this.date.value?.month() ?? moment().month()
    const selectedYear = this.date.value?.year() ?? moment().year()

    transactions.forEach((t) => {
      const amount = parseFloat(t.amount)
      const date = new Date(t.date)
      const monthKey = date.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      })

      // Przetwarzanie miesięcznych danych
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, { expenses: 0, income: 0 })
      }
      if (t.type === 'expense') monthMap.get(monthKey)!.expenses += amount
      if (t.type === 'income') monthMap.get(monthKey)!.income += amount

      // Przetwarzanie danych dziennych i kategorii
      if (
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      ) {
        if (t.type === 'expense') {
          dailyExpensesMap.set(
            date.getDate(),
            (dailyExpensesMap.get(date.getDate()) || 0) + amount
          )
          categoryMap.set(
            t.categoryLabel,
            (categoryMap.get(t.categoryLabel) || 0) + amount
          )
        }
      }
    })

    return { monthMap, dailyExpensesMap, categoryMap }
  }

  private updateBarChartData(
    monthMap: Map<string, { expenses: number; income: number }>
  ): void {
    this.barChartData.set({
      labels: [...monthMap.keys()],
      datasets: [
        {
          data: [...monthMap.values()].map((m) => m.expenses),
          label: 'Expenses',
          backgroundColor: 'red',
        },
        {
          data: [...monthMap.values()].map((m) => m.income),
          label: 'Income',
          backgroundColor: 'green',
        },
      ],
    })
  }

  private updatePieChartData(categoryMap: Map<string, number>): void {
    this.pieChartData.set({
      labels: [...categoryMap.keys()],
      datasets: [
        {
          data: [...categoryMap.values()],
          backgroundColor: this.chartsBackgrounds,
        },
      ],
    })
  }

  private updateLineChartData(dailyExpensesMap: Map<number, number>): void {
    const days = [...dailyExpensesMap.keys()].sort((a, b) => a - b)
    this.lineChartData.set({
      labels: days.map((day) => `Day ${day}`),
      datasets: [
        {
          data: days.map((day) => dailyExpensesMap.get(day) || 0),
          label: 'Expenses',
          fill: false,
          borderColor: 'red',
          tension: 0,
        },
      ],
    })
  }

  protected setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ): void {
    const ctrlValue = this.date.value ?? moment()
    ctrlValue
    .month(normalizedMonthAndYear.month())
    .year(normalizedMonthAndYear.year())
    this.date.setValue(ctrlValue)
  
    const transactions = this.appDataService.transactionsList().reverse()
    if (transactions.length > 0) {
      const { dailyExpensesMap, categoryMap } = this.processTransactions(transactions)
  
      this.updatePieChartData(categoryMap)
      this.updateLineChartData(dailyExpensesMap)
    }
  
    datepicker.close()
  }
}
