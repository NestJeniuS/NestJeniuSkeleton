import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Classification } from '@classification/domain/classification.entity'
import { Budget } from '@budget/domain/budget.entity'
import { User } from '@user/domain/entity/user.entity'

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Classification, (classification) => classification.expenses)
  classification: Classification

  @ManyToOne(() => Budget, (budget) => budget.expenses)
  budget: Budget

  @ManyToOne(() => User, (user) => user.expenses)
  user: User

  @Column({ type: 'date', nullable: true })
  date: Date

  @Column({ type: 'int', nullable: true })
  amount: number

  @Column({ type: 'varchar', length: 20, nullable: true })
  memo: string

  @Column({ type: 'boolean', nullable: true })
  exception: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
