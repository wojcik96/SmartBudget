import { StatusType } from "../../shared/model/status-type.model";

export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
}

export type AccountData = {
  name: string;
  amount: number;
  currency: string;
};

export interface Account {
  id: string;
  accountType: AccountType;
  name: string;
  balance: number;
  currency: string;
  createDate: string;
  status?: StatusType;
  lastImportDate?: string;
}
