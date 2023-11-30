import { Expense } from '@expense/domain/expense.entity'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Classification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 10, nullable: true })
  classification: string

  @OneToMany(() => Expense, (expense) => expense.classification)
  expenses: Expense[]
}
