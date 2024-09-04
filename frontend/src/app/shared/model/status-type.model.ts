export enum StatusOption {
  SUCCESS = 'bg-success',
  ERROR = 'bg-danger',
  WARNING = 'bg-warning',
}

export interface StatusType {
    type: StatusOption,
    label: string
  }
