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
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(
    @Body() createAccountDto: CreateBudgetDto,
    @Req() request: Request,
  ): Promise<any[]> {
    const user = request['user'];
    return this.budgetsService.create(createAccountDto, user);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('remove/:budgetId')
  async remove(
    @Param('budgetId') id,
    @Req() request: Request
  ): Promise<any[]> {
    const user = request['user'];

    return this.budgetsService.remove(id, user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  async getAccountsList(@Req() request: Request): Promise<any[]> {
    const user = request['user'];
    return await this.budgetsService.getAll(user);
  }

  // @Post('saveBudget')
  // public addBudget(@Body() data: BudgetFormData): Budget[] {
  //   if (!data.id) {
  //     this.budgetsService.addBudget(data);
  //   } else {
  //     this.budgetsService.updateBudget(data);
  //   }

  //   return this.budgetsService.getAllBudgets();
  // }
}
