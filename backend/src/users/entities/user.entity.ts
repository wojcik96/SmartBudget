import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
