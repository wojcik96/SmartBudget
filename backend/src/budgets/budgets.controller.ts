import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Budget, BudgetFormData } from './models/budgets';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @Get('getAllBudget')
  public getAllBudgets(): Budget[] {
    return this.budgetsService.getAllBudgets();
  }

  @Post('addBudget')
  public addBudget(@Body() data: BudgetFormData): void {
    this.budgetsService.addBudget(data);
  }

  @Put('updateBudget')
  public updateBudget(@Body() data: BudgetFormData): void {
    this.budgetsService.updateBudget(data);
  }

  @Delete('remove:id')
  public removeBudget(@Param('id') id: string): void {
    this.budgetsService.removeBudget(id);
  }
}
