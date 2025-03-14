import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Entity()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.budgets, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  
  @Column({ type: 'date' })
  plannedDate: string;

  @Column({ type: 'decimal' })
  plannedAmount: number;

  @ManyToOne(() => User, (user) => user.budgets)
  @JoinColumn({ name: 'userId' })
  user: User;
}
