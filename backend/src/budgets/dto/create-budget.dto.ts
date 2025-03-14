import { IsUUID, IsDateString, IsNumber } from 'class-validator';

export class CreateBudgetDto {
  @IsUUID()
  categoryId: string;

  @IsDateString()
  plannedDate: string;

  @IsNumber()
  plannedAmount: number;

  @IsUUID()
  userId: string;
}
