export type Currency = 'EUR' | 'PLN' | 'USD';

export enum AccountType {
  BANK = 'bank',
  WALLET = 'wallet',
}

export interface AccountDetails {
  id: string;
  accountType: AccountType;
  name: string;
  balance: number;
  currency: string;
  createDate: string;
  status?: StatusType;
  lastImportDate?: string;
}

export enum StatusOption {
  SUCCESS = 'bg-success',
  ERROR = 'bg-danger',
  WARNING = 'bg-warning',
  PERFECT = 'bg-perfect'
}

export interface StatusType {
  type: StatusOption;
  label: string;
}
