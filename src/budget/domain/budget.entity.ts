import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { User } from 'src/user/domain/entity/user.entity'
import { Classification } from 'src/classification/domain/classification.entity'
import { UUID } from 'crypto'
import { Expense } from '@expense/domain/expense.entity'

@Entity()
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' }) // JoinColumn 추가
  user: User

  @ManyToOne(() => Classification, (classification) => classification.id)
  @JoinColumn({ name: 'classification_id' }) // JoinColumn 추가
  classification: Classification

  @OneToMany(() => Expense, (expense) => expense.budget)
  expenses: Expense[]

  @Column({ type: 'int', nullable: true })
  amount: number

  @Column({ type: 'date', nullable: true })
  month: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
