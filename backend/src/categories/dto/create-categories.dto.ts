import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryType } from '../models/categories';

export class CreateCategoriesDto {
  @IsString()
  name: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsString()
  icon: string;
  
  @IsOptional()
  @IsString()
  color: string;
}
