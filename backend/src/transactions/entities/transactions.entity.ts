import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TransactionType } from '../models/transaction.model';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'varchar' })
  accountId: string;

  @Column({ type: 'varchar' })
  accountName: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', nullable: true })
  categoryLabel: string;

  @Column({ type: 'varchar' })
  categoryId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User; 
}
