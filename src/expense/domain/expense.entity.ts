import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Classification } from 'src/classification/domain/classification.entity'
import { Budget } from 'src/budget/domain/budget.entity'
import { User } from 'src/user/domain/entity/user.entity'

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Classification, (classification) => classification.id)
  classification: number

  @ManyToOne(() => Budget, (budget) => budget.id)
  budget: number

  @ManyToOne(() => User, (user) => user.id)
  user: number

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
