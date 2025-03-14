import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { CategoryType } from '../models/categories';
import { Budget } from 'src/budgets/entities/budget.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'enum', enum: CategoryType })
  @IsEnum(CategoryType)
  type: CategoryType;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @OneToMany(() => Budget, (budget) => budget.category)
  budgets: Budget[];

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[];
}
