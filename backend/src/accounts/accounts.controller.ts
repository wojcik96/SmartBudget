import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDetails } from './models/accounts';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Req() request: Request,
  ) {
    const user = request['user'];
    return this.accountsService.create(createAccountDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('remove/:accountId')
  async remove(@Param('accountId') id) {
    this.accountsService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAccountsList')
  async getAccountsList(@Req() request: Request): Promise<any[]> {
    const user = request['user'];
    return await this.accountsService.getAll(user);
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('saveAccount')
  // addAccount(@Body() data: AccountDetails): AccountDetails[] {
  //   if (!data.id) {
  //     this.accountsService.addAccount(data);
  //   } else {
  //     this.accountsService.updateAccount(data);
  //   }

  //   return this.accountsService.getAllAccounts();
  // }

  // @HttpCode(HttpStatus.OK)
  // @Delete('removeAccount/:accountId')
  // removeAccount(@Param('accountId') id: string): AccountDetails[] {
  //   this.accountsService.removeAccount(id);

  //   return this.accountsService.getAllAccounts();
  // }
}
