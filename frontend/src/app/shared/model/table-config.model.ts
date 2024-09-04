export enum ColumnType {
  CURRENCY = 'currency',
  STATUS = 'status',
}

export interface ColumnConfig {
  label: string
  key: string
  cssClass: string
  type?: ColumnType
}

export interface TableConfig {
  columns: ColumnConfig[]
  data: { [key: string]: any }[]
  showDropdownMenu: boolean
}
