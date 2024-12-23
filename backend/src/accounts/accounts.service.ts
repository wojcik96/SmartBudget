import { Injectable } from '@nestjs/common';
import { AccountDetails } from './models/accounts';

@Injectable()
export class AccountsService {
  private accountsList: AccountDetails[] = [];
}
