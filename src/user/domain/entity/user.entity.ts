import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { Exclude, Expose, Transform, Type } from 'class-transformer'
import { UUID } from 'crypto'
import { Expense } from '@expense/domain/expense.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: UUID

  @Column({ length: 15 })
  @Expose()
  email: string

  @Column()
  @Exclude()
  password: string

  // @Column({ nullable: false, type: 'varchar', default: '' })
  // @Expose()
  // discordUrl: string

  @CreateDateColumn()
  @Expose()
  createdAt: Date

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[]
}
