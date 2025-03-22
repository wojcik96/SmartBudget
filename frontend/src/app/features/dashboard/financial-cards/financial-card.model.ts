import { Signal } from "@angular/core"

export type FinancialCard = {
  icon: string,
  title: string,
  value: Signal<number>,
  currency: string
}