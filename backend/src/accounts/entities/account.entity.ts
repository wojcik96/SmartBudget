import { Budget } from 'src/budgets/entities/budget.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AccountType } from '../models/accounts';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  type: AccountType;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
