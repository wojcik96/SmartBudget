import { Account } from 'src/accounts/entities/account.entity';
import { Budget } from 'src/budgets/entities/budget.entity';
import { Transaction } from 'src/transactions/entities/transactions.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  login: string;

  @Column({ type: 'varchar', length: 15 })
  firstName: string;

  @Column({ type: 'varchar', length: 15 })
  lastName: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts: Account[];
}
