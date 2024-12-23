export type Currency = 'EUR' | 'PLN' | 'USD';

export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
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
}

export interface StatusType {
  type: StatusOption;
  label: string;
}
